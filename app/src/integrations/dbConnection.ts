import db from "../config/db";
import {DataSource} from "typeorm";

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

export default dbConnection;