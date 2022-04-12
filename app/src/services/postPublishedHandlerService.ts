import Event from "../interfaces/event";
import getPostTagsByIdService from "./getPostTagsByIdService";
import {Tag} from "@tribeplatform/gql-client/types/tribe-graphql.generated";
import {Tag as TagEntity} from "../entities/tag";
import findTagsByTitlesService from "./findTagsByTitlesService";
import findUsersAttachedToTagIdsService from "./findUsersAttachedToTagIdsService";
import dispatchEvent from "../integrations/rabbitmq";
import {UserTag} from "../entities/userTag";

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
    const tagTitles = postTags.map((tag: Tag) => tag.title);
    const tags = await findTagsByTitlesService(tagTitles);
    const tagIds = tags.map((entity: TagEntity) => entity.id);
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

export default postPublishedHandlerService;