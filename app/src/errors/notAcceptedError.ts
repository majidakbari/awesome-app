import AbstractError from "./abstractError";

class NotAcceptedError extends AbstractError{
    constructor() {
        super(406, "This application only returns json responses.");
    }
}

export default NotAcceptedError;