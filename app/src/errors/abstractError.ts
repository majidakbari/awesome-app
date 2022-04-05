import {ValidationError} from "express-validator";

abstract class AbstractError extends Error {
    protected constructor(private statusCode: number, message: string, private details: ValidationError[] = []) {
        super(message);
    }

    public getMessage = (): string => this.message;
    public getStatusCode = (): number => this.statusCode;
    public getDetails: () => ValidationError[] = () => this.details;
}

export default AbstractError;