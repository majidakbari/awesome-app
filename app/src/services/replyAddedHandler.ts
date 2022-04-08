import Event from "../interfaces/event";
import graphqlClient from "../integrations/graphqlClient";
import createOrFindTagService from "./createOrFindTagService";
import attachTagToUserService from "./attachTagToUserService";

const replyAddedHandler = async (event: Event): Promise<void> => {
    const postId = event.eventBody.object?.postId;
    const userId = event.eventBody.actor?.id
    if (!postId || !userId) {
        return;
    }
    const client = await graphqlClient();
    const post = await client.posts.get(postId, {tags: 'all'})
    const postTags = post.tags;
    if (!postTags) {
        return;
    }
    for (const tag of postTags) {
        const tagId = await createOrFindTagService(tag.title);
        await attachTagToUserService(userId, tagId);
    }
};

export default replyAddedHandler;