import {closeConnection, userTagRepository} from "../../../integrations/dbConnection";
import replyAddedHandlerService from "../../../services/replyAddedHandlerService";
import Event from "../../../interfaces/event";
import * as assert from "assert";

const getPostTagsByIdService = require("../../../services/getPostTagsByIdService")

jest.mock("../../../services/getPostTagsByIdService", () => jest.fn());

beforeEach(() => {
    getPostTagsByIdService.mockClear();
});

describe('reply added handler service should work as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterAll(async (): Promise<void> => {
        await closeConnection();
    });

    it('should find the post tags through graphql and attach it to the user who left the reply.', async () => {
        const postTags = [{title: 'foo'}, {title: 'bar'}, {title: 'buzz'}];
        const postId = 'some-post-id';
        const actorId = 'sth-id';

        getPostTagsByIdService.mockImplementation(async () => Promise.resolve(postTags));

        const event = {
            eventType: 'reply.added',
            eventBody: {
                object: {
                    postId: postId
                },
                actor: {
                    id: actorId
                }
            }
        } as Event;

        await replyAddedHandlerService(event);

        const userTags = await (await userTagRepository()).find({where: {userId: actorId}});

        assert.equal(userTags?.length, 3);
        expect(getPostTagsByIdService).toBeCalledWith(postId);
        expect(getPostTagsByIdService).toHaveBeenCalled();
    });

    it('should do nothing when event structure is not correct.', async () => {
        const event = {
            eventType: 'reply.added',
            eventBody: {}
        } as Event;

        await replyAddedHandlerService(event);

        const userTags = await (await userTagRepository()).find();

        assert.equal(userTags?.length, 0);
        expect(getPostTagsByIdService).not.toHaveBeenCalled();
    });
});