import {RequestHandler} from "express";
import NotAcceptableError from "../errors/clinetError/notAcceptedError";

const acceptableRequestHandler: RequestHandler = (req, res, next) => {
    const acceptHeader = req.header("accept");
    if (acceptHeader != undefined) {
        if (["*/*", "application/json"].indexOf(acceptHeader.toString()) < 0) {
            throw new NotAcceptableError();
        }
    }
    next();
};

export default acceptableRequestHandler;