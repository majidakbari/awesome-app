import {closeConnection, userTagRepository} from "../../../integrations/dbConnection";
import {UserTag} from "../../../entities/userTag";
import attachTagToUserService from "../../../services/attachTagToUserService";
import * as assert from "assert";

describe('attach tag to user service should act as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterAll(async (): Promise<void> => {
        await closeConnection();
    });

    it('should do nothing when userTag record already exists.', async () => {
        const repository = await userTagRepository();
        const userId = 'foo';
        const tagId = 200;
        const userTag = new UserTag();
        userTag.tagId = tagId;
        userTag.userId = userId;

        await attachTagToUserService(userId, tagId);

        assert.equal(await repository.count(), 1);
    });

    it('should store a new record in userTag table.', async () => {
        const repository = await userTagRepository();
        const userId = 'foo';
        const tagId = 200;

        await attachTagToUserService(userId, tagId);

        const dbRecord = await repository.findOneBy({userId: userId, tagId: tagId});

        assert.equal(dbRecord?.tagId, tagId);
        assert.equal(dbRecord?.userId, userId);
    });
});
