import {RequestHandler} from "express";
import {validationResult} from "express-validator";
import UnprocessableEntityError from "../errors/clinetErrors/unprocessableEntityError";

const validationErrorHandler: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new UnprocessableEntityError(errors.array());
    }
    next();
};

export default validationErrorHandler;