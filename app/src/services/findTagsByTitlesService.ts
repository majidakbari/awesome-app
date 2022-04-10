import {Tag} from "../entities/tag";
import {In} from "typeorm";
import {tagRepository} from "../integrations/dbConnection";

const findTagsByTitlesService = async (titles: string[]): Promise<Tag[]> => {
    const repository = await tagRepository();
    return await repository.find({where: {name: In(titles)}})
}

export default findTagsByTitlesService;