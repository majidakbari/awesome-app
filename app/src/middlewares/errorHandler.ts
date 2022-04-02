import AbstractError from "../errors/abstractError";
import ErrorInterface from "../interfaces/errorInterface";
import {Request, Response, NextFunction, ErrorRequestHandler} from "express";

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AbstractError) {
        const error: ErrorInterface = {
            error: "Client Error",
            message: err.message
        };
        res.status(err.statusCode).json(error);
    } else {
        res.status(500).json({
            error: "Server Error",
            message: "Something went wrong."
        });
    }
    next();
};

export default errorHandler;