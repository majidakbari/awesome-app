import AbstractClientError from "./abstractClientError";

class NotAcceptedError extends AbstractClientError {
    constructor() {
        super(406, "This application only returns json responses.");
    }
}

export default NotAcceptedError;