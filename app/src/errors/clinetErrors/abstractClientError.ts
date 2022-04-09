import AbstractError from "../abstractError";
import {ValidationError} from "express-validator";

abstract class AbstractClientError extends AbstractError {
    protected constructor(protected statusCode: number, message: string, protected details: ValidationError[] = []) {
        super(statusCode, message);
    }
    public getDetails: () => ValidationError[] = () => this.details;

}

export default AbstractClientError;