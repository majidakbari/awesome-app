import Event from "../interfaces/event";
import getPostTagsByIdService from "./getPostTagsByIdService";
import {Tag} from "@tribeplatform/gql-client/types/tribe-graphql.generated";
import findUsersAttachedToTagIdsService from "./findUsersAttachedToTagIdsService";
import dispatchEvent from "../integrations/rabbitmq";
import {UserTag} from "../entities/userTag";
import createOrFindTagService from "./createOrFindTagService";
import attachTagToUserService from "./attachTagToUserService";

const postPublishedHandlerService = async (event: Event): Promise<void> => {
    const postId = event.eventBody.object?.id;
    const userId = event.eventBody.actor?.id
    if (!postId || !userId) {
        return;
    }
    const postTags = await getPostTagsByIdService(postId);
    if (!postTags || postTags.length === 0) {
        return;
    }

    const tagIds = await attachPostTagsToItsCreator(postTags, userId);
    if (!tagIds || tagIds.length === 0) {
        return;
    }

    const usersAttached = await findUsersAttachedToTagIdsService(tagIds, userId);
    if (!usersAttached || usersAttached.length === 0) {
        return;
    }

    await dispatchEvent({
        postId: postId,
        userIds: usersAttached.map((userTag: UserTag) => userTag.userId)
    }, "notification");
}

const attachPostTagsToItsCreator = async (postTags: Array<Tag>, userId: string): Promise<number[]> => {
    const tagTitles = postTags.map((tag: Tag) => tag.title);
    const tagIds = [];
    for (const tagTitle of tagTitles) {
        const tagId = await createOrFindTagService(tagTitle)
        await attachTagToUserService(userId, tagId);
        tagIds.push(tagId);
    }
    return tagIds;
}

export default postPublishedHandlerService;