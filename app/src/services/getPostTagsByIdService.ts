import graphqlClient from "../integrations/graphqlClient";
import {Tag} from "@tribeplatform/gql-client/types/tribe-graphql.generated";

const getPostTagsByIdService = async (postId: string): Promise<Array<Tag> | null | undefined> => {
    const client = await graphqlClient();
    const post = await client.posts.get(postId, {tags: "all"})
    return post.tags;
}

export default getPostTagsByIdService;