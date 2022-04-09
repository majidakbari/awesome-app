import AbstractClientError from "./abstractClientError";

class NotSupportedEventError extends AbstractClientError {
    constructor() {
        super(400, "This event is not supported by the app.");
    }
}

export default NotSupportedEventError;