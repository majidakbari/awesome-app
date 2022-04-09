import Event from "../interfaces/event";
import getPostTagsByIdService from "./getPostTagsByIdService";
import {Tag} from "@tribeplatform/gql-client/types/tribe-graphql.generated";
import {Tag as TagEntity} from "../entities/tag";
import findTagsByTitlesService from "./findTagsByTitlesService";
import findUsersAttachedToTagIdsService from "./findUsersAttachedToTagIdsService";

const postPublishedHandlerService = async (event: Event): Promise<void> => {
    const postId = event.eventBody.object?.postId;
    const userId = event.eventBody.actor?.id
    if (!postId || !userId) {
        return;
    }
    const postTags = await getPostTagsByIdService(postId);
    if (!postTags) {
        return;
    }
    const tagTitles = postTags.map((tag: Tag) => tag.title);
    const tags = await findTagsByTitlesService(tagTitles);
    const tagIds = tags.map((entity: TagEntity) => entity.id);
    if (!tagIds) {
        return;
    }
    const usersAttached = await findUsersAttachedToTagIdsService(tagIds, userId);
    // dispatch events to these users (usersAttached)
}

export default postPublishedHandlerService;