import {closeConnection, tagRepository, userTagRepository} from "../../../integrations/dbConnection";
import Event from "../../../interfaces/event";
import postPublishedHandlerService from "../../../services/postPublishedHandlerService";
import {Tag} from "../../../entities/tag";
import {UserTag} from "../../../entities/userTag";

const getPostTagsByIdService = require("../../../services/getPostTagsByIdService");
const dispatchEvent = require("../../../integrations/rabbitmq");

jest.mock("../../../services/getPostTagsByIdService", () => jest.fn());
jest.mock("../../../integrations/rabbitmq", () => jest.fn());

beforeEach(() => {
    getPostTagsByIdService.mockClear();
    dispatchEvent.mockClear();
});


describe('post published handler service should work as expected.', () => {

    beforeAll(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterEach(async (): Promise<void> => {
        await (await userTagRepository()).clear();
    });

    afterAll(async (): Promise<void> => {
        await closeConnection();
    });

    it(
        'should find the post tags by querying graphql and suggest this post to all users having these tags attached.',
        async () => {
            const postId = 'some-post-id';
            const postCreatorId = 'foo-id';
            const tagTitle = 'foo-title';
            const userAttachedId1 = 'first-user-id';
            const userAttachedId2 = 'second-user-id';

            const postTags = [{title: tagTitle}];
            const dbTag = new Tag();
            dbTag.name = tagTitle;
            await (await tagRepository()).save(dbTag);

            const userTag1 = new UserTag();
            userTag1.tagId = dbTag.id;
            userTag1.userId = userAttachedId1;
            await (await userTagRepository()).save(userTag1);

            const userTag2 = new UserTag();
            userTag2.tagId = dbTag.id;
            userTag2.userId = userAttachedId2;
            await (await userTagRepository()).save(userTag2);

            const event = {
                eventType: 'post.published',
                eventBody: {
                    object: {
                        id: postId
                    },
                    actor: {
                        id: postCreatorId
                    }
                }
            } as Event;

            getPostTagsByIdService.mockImplementation(async () => Promise.resolve(postTags));

            await postPublishedHandlerService(event);
            expect(getPostTagsByIdService).toHaveBeenCalled();
            expect(getPostTagsByIdService).toBeCalledWith(postId);
            expect(dispatchEvent).toHaveBeenCalled();
            expect(dispatchEvent).toBeCalledWith({
                postId: postId,
                userIds: [userTag1.userId, userTag2.userId]
            }, 'notification');
        }
    );

    it('should do nothing when event structure is not correct.', async () => {
        const event = {
            eventType: 'post.published',
            eventBody: {}
        } as Event;

        await postPublishedHandlerService(event);

        expect(getPostTagsByIdService).not.toHaveBeenCalled();
        expect(dispatchEvent).not.toHaveBeenCalled();
    });
});
