import Event from "../interfaces/event";
import notSupportedEventError from "../errors/clinetErrors/notSupportedEventError";
import tagAddedHandlerService from "./tagAddedHandlerService";
import replyAddedHandlerService from "./replyAddedHandlerService";
import postPublishedHandlerService from "./postPublishedHandlerService";

const manageWebhookService = async (event: Event): Promise<void> => {
    switch (event.eventType) {
        case 'tag.added':
            await tagAddedHandlerService(event);
            break;
        case 'reply.added':
        case 'reaction.added':
            await replyAddedHandlerService(event);
            break;
        case 'post.published':
            await postPublishedHandlerService(event);
            break;
        case 'TEST':
            // do nothing
            break;
        default:
            throw new notSupportedEventError();
    }
};

export default manageWebhookService;