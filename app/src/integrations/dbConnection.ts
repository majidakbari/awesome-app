import db from "../config/db";
import {DataSource, Repository} from "typeorm";
import {Tag} from "../entities/tag";
import {UserTag} from "../entities/userTag";

let connection: DataSource;

const connectToDb = async (): Promise<DataSource> => {
    connection = await new DataSource(db).initialize();
    return connection;
};

const dbConnection = async (): Promise<DataSource> => {
    if (connection != undefined) {
        return connection;
    }
    return await connectToDb();
};

const tagRepository = async (): Promise<Repository<Tag>> => {
    return (await dbConnection()).getRepository(Tag);
};

const userTagRepository = async (): Promise<Repository<UserTag>> => {
    return (await dbConnection()).getRepository(UserTag);
};

export {dbConnection, tagRepository, userTagRepository};