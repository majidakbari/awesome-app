import {closeConnection, userTagRepository} from "../../../integrations/dbConnection";
import assert = require("assert");
import findUsersAttachedToTagIdsService from "../../../services/findUsersAttachedToTagIdsService";
import {UserTag} from "../../../entities/userTag";

describe('find users attached to many tags service should work as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterAll(async (): Promise<void> => {
        await closeConnection();
    });

    it('should return an empty list when tags are not attached to any user.', async () => {
        const actual = await findUsersAttachedToTagIdsService([1, 2, 3], 'foo');

        assert.equal(actual.length, 0);
    });

    it('should return users that are attached to the corresponding tags.', async () => {
        const repository = await userTagRepository();
        const userId = 'bar';
        const userTag1 = new UserTag();
        userTag1.tagId = 1;
        userTag1.userId = userId;
        await repository.save(userTag1);
        const userTag2 = new UserTag();
        userTag2.tagId = 2;
        userTag2.userId = 'buzz';
        await repository.save(userTag2);

        const actual = await findUsersAttachedToTagIdsService([1, 2, 3], 'foo');

        assert.equal(actual.length, 2);
        assert.equal(actual[0]?.userId, 'bar');
        assert.equal(actual[1]?.userId, 'buzz');
    });
});
