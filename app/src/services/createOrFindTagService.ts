import dbConnection from "../integrations/dbConnection";
import {Tag} from "../entities/tag";

const createOrFindTagService = async (tagName: string) => {
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

export default createOrFindTagService;