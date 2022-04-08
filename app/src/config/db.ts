import {DataSourceOptions} from "typeorm";
import {Tag} from "../entities/tag";
import {UserTag} from "../entities/userTag";

const db: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Tag,
        UserTag
    ],
    synchronize: true,
    logging: false
};

export default db;