import {Tag} from "../entities/tag";
import dbConnection from "../integrations/dbConnection";
import {In} from "typeorm";

const findTagsByTitlesService = async (titles: string[]): Promise<Tag[]> => {
    const connection = await dbConnection();
    const tagRepository = connection.getRepository(Tag);
    return await tagRepository.find({where: {name: In(titles)}})
}

export default findTagsByTitlesService;