import {ValidationError } from "express-validator";
import AbstractClientError from "./abstractClientError";

class UnprocessableEntityError extends AbstractClientError{
    constructor(details: ValidationError[]) {
        super(422, "Unprocessable Entity.", details);
    }
}

export default UnprocessableEntityError;