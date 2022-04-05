import AbstractClientError from "./abstractClientError";

class RouteNotFoundError extends AbstractClientError {
    constructor() {
        super(404, "Route not found.");
    }
}

export default RouteNotFoundError;