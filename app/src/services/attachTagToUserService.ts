import dbConnection from "../integrations/dbConnection";
import {UserTag} from "../entities/userTag";

const attachTagToUserService = async (userId: string, tagId: number): Promise<void> => {
    const connection = await dbConnection();
    const userTagRepository = connection.getRepository(UserTag);
    const existingRecord = await userTagRepository.findOneBy({userId: userId, tagId: tagId});
    if (existingRecord) {
        return;
    }
    const userTag = new UserTag();
    userTag.userId = userId;
    userTag.tagId = tagId;
    await userTagRepository.save(userTag);
}

export default attachTagToUserService;