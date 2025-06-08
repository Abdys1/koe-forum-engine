import { RestApiValidationErrors } from "@src/middlewares/types";
import { Result, ValidationError } from "express-validator";

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