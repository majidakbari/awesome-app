import Event from "../interfaces/event";
import notSupportedEventError from "../errors/clinetErrors/notSupportedEventError";
import tagAddedHandler from "./tagAddedHandler";
import replyAddedHandler from "./replyAddedHandler";

const manageWebhookService = async (event: Event): Promise<void> => {
    switch (event.eventType) {
        case 'tag.added':
            await tagAddedHandler(event);
            break;
        case 'reply.added':
        case 'reaction.added':
            replyAddedHandler(event);
            break;
        case 'TEST':
            // do nothing
            break;
        default:
            throw new notSupportedEventError();
    }
};

export default manageWebhookService;