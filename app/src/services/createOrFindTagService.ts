import {Tag} from "../entities/tag";
import {tagRepository} from "../integrations/dbConnection";

const createOrFindTagService = async (tagName: string): Promise<number> => {
    const repository = await tagRepository();
    const existingTag = await repository.findOneBy({name: tagName});
    if (existingTag) {
        return existingTag.id;
    }
    const tag = new Tag();
    tag.name = tagName;
    await repository.save(tag);
    return tag.id;
}

export default createOrFindTagService;