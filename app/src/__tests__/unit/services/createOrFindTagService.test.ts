import dbConnection from "../../../integrations/dbConnection";
import {Tag} from "../../../entities/tag";
import createOrFindTagService from "../../../services/createOrFindTagService";
import assert = require("assert");


describe('create or find tag service should work as expected.', () => {

    beforeAll(async (): Promise<void> => {
        const connection = await dbConnection();
        const tagRepository = await connection.getRepository(Tag);
        tagRepository.clear();
    });

    afterEach(async (): Promise<void> => {
        const connection = await dbConnection();
        const tagRepository = await connection.getRepository(Tag);
        tagRepository.clear();
    });

    it('should do nothing when tag already exists.', async () => {
        const connection = await dbConnection();
        const tagRepository = await connection.getRepository(Tag);
        const tagTitle = 'foo-tag';
        const tag = new Tag();
        tag.name = tagTitle;
        await tagRepository.save(tag)

        const actual = await createOrFindTagService(tagTitle);

        const dbRecord = await tagRepository.findOneBy({name: tagTitle});

        assert.equal(await tagRepository.count(), 1);
        assert.equal(actual, dbRecord?.id);
    });

    it('should create a new tag record.', async () => {
        const connection = await dbConnection();
        const tagRepository = await connection.getRepository(Tag);
        const tagTitle = 'foo-bar-tag';

        await createOrFindTagService(tagTitle);

        const dbRecord = await tagRepository.findOneBy({name: tagTitle});

        assert.equal(tagTitle, dbRecord?.name);
    });
});
