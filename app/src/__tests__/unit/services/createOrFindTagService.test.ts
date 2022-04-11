import {Tag} from "../../../entities/tag";
import createOrFindTagService from "../../../services/createOrFindTagService";
import assert = require("assert");
import {tagRepository} from "../../../integrations/dbConnection";

describe('create or find tag service should work as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await tagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await tagRepository()).clear();
    });

    it('should do nothing when tag already exists.', async () => {
        const repository = await tagRepository();
        const tagTitle = 'foo-tag';
        const tag = new Tag();
        tag.name = tagTitle;
        await repository.save(tag)

        const actual = await createOrFindTagService(tagTitle);

        const dbRecord = await repository.findOneBy({name: tagTitle});

        assert.equal(await repository.count(), 1);
        assert.equal(actual, dbRecord?.id);
    });

    it('should create a new tag record.', async () => {
        const repository = await tagRepository();
        const tagTitle = 'foo-bar-tag';

        await createOrFindTagService(tagTitle);

        const dbRecord = await repository.findOneBy({name: tagTitle});

        assert.equal(tagTitle, dbRecord?.name);
    });
});
