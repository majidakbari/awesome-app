import Event from "../interfaces/event";
import {Tag} from "../entities/tag";
import dbConnection from "../integrations/dbConnection";
import {UserTag} from "../entities/userTag";

const tagAddedHandler = async (event: Event): Promise<void> => {
    const tagName = event.eventBody.object?.title;
    const userId = event.eventBody.actor?.id;
    if (!tagName || !userId) {
        return;
    }
    const tagId = await createOrFindTag(tagName);
    await attachTagToUser(userId, tagId);
};

const createOrFindTag = async (tagName: string) => {
    const connection = await dbConnection();
    let tagId: number;
    const tagRepository = connection.getRepository(Tag);
    const existingTag = await tagRepository.findOneBy({name: tagName});
    if (!existingTag) {
        const tag = new Tag();
        tag.name = tagName;
        const newTag = await tagRepository.save(tag);
        tagId = newTag.id;
    } else {
        tagId = existingTag.id;
    }
    return tagId;
}

const attachTagToUser = async (userId: string, tagId: number): Promise<void> => {
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

export default tagAddedHandler;