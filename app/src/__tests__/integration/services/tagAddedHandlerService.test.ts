import {closeConnection, tagRepository, userTagRepository} from "../../../integrations/dbConnection";
import tagAddedHandlerService from "../../../services/tagAddedHandlerService";
import Event from "../../../interfaces/event";
import * as assert from "assert";

describe('attach tag to user service should act as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await userTagRepository()).clear();
        await (await tagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await userTagRepository()).clear();
        await (await tagRepository()).clear();
    });

    afterAll(async (): Promise<void> => {
        await closeConnection();
    });

    it('should attach the tag to user.', async () => {
        const tagTitle = 'foo-tag';
        const tagCreatorId = 'some-user-id';
        const event = {
            eventType: 'tag.added',
            eventBody: {
                object: {
                    title: tagTitle
                },
                actor: {
                    id: tagCreatorId
                }
            }
        } as Event;

        await tagAddedHandlerService(event);

        const dbTag = await (await tagRepository()).findOneBy({name: tagTitle});
        const dbUserTag = await (await userTagRepository()).findOneBy({userId: tagCreatorId, tagId: dbTag?.id});

        assert.equal(dbUserTag?.userId, tagCreatorId);
        assert.equal(dbTag?.name, tagTitle);
    });

    it('should do nothing when event structure is not correct.', async () => {
        const event = {
            eventType: 'tag.added',
            eventBody: {}
        } as Event;

        await tagAddedHandlerService(event);

        const tags = await (await tagRepository()).find();
        const userTags = await (await userTagRepository()).find();

        assert.equal(tags?.length, 0);
        assert.equal(userTags?.length, 0);
    });
});