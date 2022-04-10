import {tagRepository} from "../../../integrations/dbConnection";
import {Tag} from "../../../entities/tag";
import findTagsByTitlesService from "../../../services/findTagsByTitlesService";
import assert = require("assert");


describe('find tags by title service should work as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await tagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await tagRepository()).clear();
    });

    it('should return an empty array when titles do not exist in db.', async () => {
        const actual = await findTagsByTitlesService(['foo', 'bar']);

        assert.equal(actual.length, 0);
    });

    it('should return matching tags.', async () => {
        const repository = await tagRepository();
        const tag1 = new Tag();
        tag1.name = 'foo';
        const expected = await repository.save(tag1);
        const tag2 = new Tag();
        tag2.name = 'buzz';
        await repository.save(tag2);

        const actual = await findTagsByTitlesService(['foo', 'bar']);

        assert.equal(actual.length, 1);
        assert.equal(actual[0]?.name, expected.name);
        assert.equal(actual[0]?.id, expected.id);
    });
});
