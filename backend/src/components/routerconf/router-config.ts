/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from "@src/components/logger/logger";
import RestApiValidationError from "@src/middlewares/rest-api-validation.error";
import { AuthenticationMiddleware } from "@src/middlewares/types";
import { Request, Response, NextFunction, RequestHandler, Router } from "express";
import { validationResult } from "express-validator";

export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
} as const;

export type HttpMethod = keyof typeof HttpMethod;

export interface RouterConfig {
    path: string,
    method: HttpMethod,
    controller: RequestHandler,
    public?: boolean,
    middlewares?: any[]
}

export function useDefineRouter(authMiddleware: AuthenticationMiddleware) {
    return (config: RouterConfig[]): Router => {
        const router = Router();
        config.forEach(c => {
            const middlewares: any[] = [];
            if (!c.public) {
                middlewares.push(authMiddleware);
            }
            if (c.middlewares) {
                middlewares.push(...c.middlewares);
            }
            addRoute(router, c.method, c.path, middlewares, asyncHandler(c.controller));
        });
        return router;
    }
}

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

function addRoute(router: Router, method: HttpMethod, path: string, middlewares: any[], controller: RequestHandler) {
    switch (method) {
        case HttpMethod.GET:
            router.get(path, middlewares, controller);
            break;
        case HttpMethod.POST:
            router.post(path, middlewares, controller);
            break;
        case HttpMethod.PUT:
            router.put(path, middlewares, controller);
            break;
        case HttpMethod.DELETE:
            router.delete(path, middlewares, controller);
            break;
    }
}