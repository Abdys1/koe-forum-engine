import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import expressAsyncHandler from "express-async-handler"
import RestApiValidationError from "@src/middlewares/rest-api-validation.error";

// TODO ezt lehetne szépíteni, hogy tudjuk hogy egy promise
function asyncHandler(fn: RequestHandler): RequestHandler {
    return expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            throw new RestApiValidationError(validation);
        }
        await fn(req, res, next);
    });
}

export default asyncHandler;