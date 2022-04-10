import dbConnection from "../../../integrations/dbConnection";
import {UserTag} from "../../../entities/userTag";
import attachTagToUserService from "../../../services/attachTagToUserService";
import assert = require("assert");

describe('attach tag to user service should act as expected.', () => {

    beforeAll(async (): Promise<void> => {
        // const connection = await dbConnection();
        // const userTagRepository = await connection.getRepository(UserTag);
        // userTagRepository.clear();
    });

    afterEach(async (): Promise<void> => {
        // const connection = await dbConnection();
        // const userTagRepository = await connection.getRepository(UserTag);
        // userTagRepository.clear();
    });

    it('should do nothing when userTag record already exists.', async () => {
        const connection = await dbConnection();
        const userTagRepository = await connection.getRepository(UserTag);
        const userId = 'foo';
        const tagId = 200;
        const userTag = new UserTag();
        userTag.tagId = tagId;
        userTag.userId = userId;

        await attachTagToUserService(userId, tagId);

        assert.equal(await userTagRepository.count(), 1);
    });

    it('should store a new record in userTag table.', async () => {
        const connection = await dbConnection();
        const userTagRepository = await connection.getRepository(UserTag);
        const userId = 'foo';
        const tagId = 200;

        await attachTagToUserService(userId, tagId);

        const dbRecord = await userTagRepository.findOneBy({userId: userId, tagId: tagId});

        assert.equal(dbRecord?.tagId, tagId);
        assert.equal(dbRecord?.userId, userId);
    });
});
