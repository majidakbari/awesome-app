import AbstractClientError from "../errors/abstractClientError";
import ErrorInterface from "../interfaces/error";
import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import AbstractServerError from "../errors/abstractServerError";

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error: ErrorInterface;
    let statusCode: number;

    if (err instanceof AbstractClientError) {
        statusCode = err.statusCode;
        error = {
            error: "Client Error",
            message: err.message
        };
        if (err.details.length > 0) {
            error.details = err.details;
        }
    } else if (err instanceof AbstractServerError) {
        statusCode = err.statusCode;
        error = {
            error: "Server Error",
            message: err.message
        };
    } else {
       statusCode = 500;
       error = {
           error: "Server Error",
           message: "Something went wrong."
       };
    }
    res.status(statusCode).json(error);
    next();
};

export default errorHandler;