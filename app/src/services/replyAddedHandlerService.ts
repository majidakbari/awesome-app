import Event from "../interfaces/event";
import createOrFindTagService from "./createOrFindTagService";
import attachTagToUserService from "./attachTagToUserService";
import getPostTagsByIdService from "./getPostTagsByIdService";

const replyAddedHandlerService = async (event: Event): Promise<void> => {
    const postId = event.eventBody.object?.postId;
    const userId = event.eventBody.actor?.id
    if (!postId || !userId) {
        return;
    }
    const postTags = await getPostTagsByIdService(postId);
    if (!postTags || postTags.length === 0) {
        return;
    }
    for (const tag of postTags) {
        const tagId = await createOrFindTagService(tag.title);
        await attachTagToUserService(userId, tagId);
    }
};

export default replyAddedHandlerService;