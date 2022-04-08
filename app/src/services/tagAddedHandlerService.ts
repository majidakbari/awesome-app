import Event from "../interfaces/event";
import attachTagToUserService from "./attachTagToUserService";
import createOrFindTagService from "./createOrFindTagService";

const tagAddedHandlerService = async (event: Event): Promise<void> => {
    const tagName = event.eventBody.object?.title;
    const userId = event.eventBody.actor?.id;
    if (!tagName || !userId) {
        return;
    }
    const tagId = await createOrFindTagService(tagName);
    await attachTagToUserService(userId, tagId);
};

export default tagAddedHandlerService;