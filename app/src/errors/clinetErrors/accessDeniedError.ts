import AbstractClientError from "./abstractClientError";

class accessDeniedError extends AbstractClientError {
    constructor() {
        super(403, "Forbidden.");
    }
}

export default accessDeniedError;