import AbstractClientError from "./abstractClientError";

class MethodNotAllowedError extends AbstractClientError {
    constructor() {
        super(405, "Method not allowed.");
    }
}

export default MethodNotAllowedError;