import {UserTag} from "../entities/userTag";
import dbConnection from "../integrations/dbConnection";
import {In, Not} from "typeorm";

const findUsersAttachedToTagIdsService = async (tagIds: number[], userId: string): Promise<UserTag[]> => {
    const connection = await dbConnection();
    const userTagRepository = connection.getRepository(UserTag);
    return await userTagRepository.find({where: {tagId: In(tagIds), userId: Not(userId)}});
};

export default findUsersAttachedToTagIdsService;