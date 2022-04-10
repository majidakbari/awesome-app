import {UserTag} from "../entities/userTag";
import {userTagRepository} from "../integrations/dbConnection";

const attachTagToUserService = async (userId: string, tagId: number): Promise<void> => {
    const repository = await userTagRepository();
    const existingRecord = await repository.findOneBy({userId: userId, tagId: tagId});
    if (existingRecord) {
        return;
    }
    const userTag = new UserTag();
    userTag.userId = userId;
    userTag.tagId = tagId;
    await repository.save(userTag);
}

export default attachTagToUserService;