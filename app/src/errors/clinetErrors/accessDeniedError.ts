import AbstractClientError from "./abstractClientError";

class AccessDeniedError extends AbstractClientError {
    constructor() {
        super(403, "Forbidden.");
    }
}

export default AccessDeniedError;