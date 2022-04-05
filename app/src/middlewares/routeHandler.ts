import {RequestHandler} from "express";
import RouteNotFoundError from "../errors/clinetErrors/routeNotFoundError";

const routeHandler: RequestHandler = (req, res, next) => {
    if (!req.route)
        throw new RouteNotFoundError();
    next();
};

export default routeHandler;