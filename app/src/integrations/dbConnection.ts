import db from "../config/db";
import {DataSource, Repository} from "typeorm";
import {Tag} from "../entities/tag";
import {UserTag} from "../entities/userTag";

let connection: DataSource;

const connectToDb = async (): Promise<DataSource> => {
    connection = await new DataSource(db).initialize();
    return connection;
};

//This method creates a connection pool not a connection, so we never need to close it as long as the app is running.
const connectionPool = async (): Promise<DataSource> => {
    if (connection != undefined) {
        return connection;
    }
    connection = await connectToDb();
    return connection;
};

const tagRepository = async (): Promise<Repository<Tag>> => {
    return (await connectionPool()).getRepository(Tag);
};

const userTagRepository = async (): Promise<Repository<UserTag>> => {
    return (await connectionPool()).getRepository(UserTag);
};

const closeConnection = async (): Promise<void> => {
    if (connection) {
        await connection.destroy();
    }
};

export {tagRepository, userTagRepository, closeConnection};