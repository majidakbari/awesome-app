import manageWebhookService from "../../../services/manageWebhookService";
import NotSupportedEventError from "../../../errors/clinetErrors/notSupportedEventError";

const tagAddedHandlerService = require("../../../services/tagAddedHandlerService");
const replyAddedHandlerService = require("../../../services/replyAddedHandlerService")
const postPublishedHandlerService = require("../../../services/postPublishedHandlerService")

jest.mock("../../../services/tagAddedHandlerService", () => jest.fn());
jest.mock("../../../services/replyAddedHandlerService", () => jest.fn());
jest.mock("../../../services/postPublishedHandlerService", () => jest.fn());

beforeEach(() => {
    tagAddedHandlerService.mockClear();
    replyAddedHandlerService.mockClear();
    postPublishedHandlerService.mockClear();
});

describe('Manage webhook service should call the right services based on event type.', () => {
    it('should call tagAddedHandlerService when event type is tag.added.', async () => {
        const event = {
            eventType: 'tag.added',
            eventBody: {}
        }

        await manageWebhookService(event);

        expect(tagAddedHandlerService).toHaveBeenCalled();
        expect(tagAddedHandlerService).toBeCalledWith(event);
    });

    it('should call replyAddedHandlerService when event type is reply.added.', async () => {
        const event = {
            eventType: 'reply.added',
            eventBody: {}
        }

        await manageWebhookService(event);

        expect(replyAddedHandlerService).toHaveBeenCalled();
        expect(replyAddedHandlerService).toBeCalledWith(event);
    });

    it('should call replyAddedHandlerService when event type is reaction.added.', async () => {
        const event = {
            eventType: 'reaction.added',
            eventBody: {}
        }

        await manageWebhookService(event);

        expect(replyAddedHandlerService).toHaveBeenCalled();
        expect(replyAddedHandlerService).toBeCalledWith(event);
    });

    it('should call postPublishedHandlerService when event type is post.published.', async () => {
        const event = {
            eventType: 'post.published',
            eventBody: {}
        }

        await manageWebhookService(event);

        expect(postPublishedHandlerService).toHaveBeenCalled();
        expect(postPublishedHandlerService).toBeCalledWith(event);
    });

    it('should do nothing when event type is TEST.', async () => {
        const event = {
            eventType: 'TEST',
            eventBody: {}
        }

        await manageWebhookService(event);

        expect(postPublishedHandlerService).not.toHaveBeenCalled();
        expect(replyAddedHandlerService).not.toHaveBeenCalled();
        expect(tagAddedHandlerService).not.toHaveBeenCalled();
    });

    it('should throw exception when event type is not supported.', async () => {
        try {
            const event = {
                eventType: 'foo',
                eventBody: {}
            }

            await manageWebhookService(event);
        } catch (e) {
            expect(e).toBeInstanceOf(NotSupportedEventError);
        }
    });
});
