import AbstractServerError from "./abstractServerError";

class BrokerConnectionError extends AbstractServerError {
    constructor() {
        super(503, "Something went wrong when trying to connect to the broker.");
    }
}

export default BrokerConnectionError;