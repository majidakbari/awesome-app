import {Tag} from "../entities/tag";
import {tagRepository} from "../integrations/dbConnection";

const createOrFindTagService = async (tagName: string) => {
    let tagId: number;
    const repository = await tagRepository();
    const existingTag = await repository.findOneBy({name: tagName});
    if (!existingTag) {
        const tag = new Tag();
        tag.name = tagName;
        const newTag = await repository.save(tag);
        tagId = newTag.id;
    } else {
        tagId = existingTag.id;
    }
    return tagId;
}

export default createOrFindTagService;