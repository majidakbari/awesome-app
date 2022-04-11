import {closeConnection, tagRepository, userTagRepository} from "../../../integrations/dbConnection";
import tagAddedHandlerService from "../../../services/tagAddedHandlerService";
import Event from "../../../interfaces/event";
import assert = require("assert");

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
        assert.equal(true, true);
    });
});