import logger from "@src/components/logger/logger";
import RestApiValidationError from "@src/middlewares/rest-api-validation.error";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function asyncHandler(handler: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            logger.error(validation.array());
            next(new RestApiValidationError(validation));
        } else {
            Promise.resolve(handler(req, res, next)).catch(next);
        }
    }
}

export default asyncHandler;