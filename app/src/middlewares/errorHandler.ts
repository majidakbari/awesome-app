import AbstractClientError from "../errors/clinetError/abstractClientError";
import ErrorInterface from "../interfaces/error";
import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import AbstractServerError from "../errors/serverError/abstractServerError";

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error: ErrorInterface;
    let statusCode: number;

    if (err instanceof AbstractClientError) {
        statusCode = err.getStatusCode();
        error = {
            error: "Client Error",
            message: err.getMessage()
        };
        if (err.getDetails().length > 0) {
            error.details = err.getDetails();
        }
    } else if (err instanceof AbstractServerError) {
        statusCode = err.getStatusCode();
        error = {
            error: "Server Error",
            message: err.getMessage()
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