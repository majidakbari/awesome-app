import {UserTag} from "../entities/userTag";
import {In, Not} from "typeorm";
import {userTagRepository} from "../integrations/dbConnection";

const findUsersAttachedToTagIdsService = async (tagIds: number[], userId: string): Promise<UserTag[]> => {
    const repository = await userTagRepository();
    return await repository.find({where: {tagId: In(tagIds), userId: Not(userId)}});
};

export default findUsersAttachedToTagIdsService;