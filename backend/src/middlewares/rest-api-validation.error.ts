import { Result, ValidationError } from "express-validator";
import { RestApiValidationErrors } from "@src/middlewares/types";

class RestApiValidationError extends Error {
    private validation: Result<ValidationError>

    constructor(validation: Result<ValidationError>) {
        super();
        this.validation = validation;
    }

    public getErrors(): RestApiValidationErrors {
        return { errors: this.validation.array() };
    }
}

export default RestApiValidationError;