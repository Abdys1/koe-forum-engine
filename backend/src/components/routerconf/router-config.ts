import { AuthenticationMiddleware } from "@src/middlewares/types";
import { NextFunction, Request, Response, Router } from "express";

export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
} as const;

export type HttpMethod = keyof typeof HttpMethod;

export type RouterConfig = { path: string, method: HttpMethod, controller: (req: Request, res: Response, next: NextFunction) => void, public?: boolean }

export function useDefineRouter(authMiddleware: AuthenticationMiddleware) {
    return (config: RouterConfig[]): Router => {
        const router = Router();
        config.forEach(c => {
            const middlewares = [];
            if (!c.public) {
                middlewares.push(authMiddleware);
            }
            addRoute(router, c.method, c.path, middlewares, c.controller);
        });
        return router;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addRoute(router: Router, method: HttpMethod, path: string, middlewares: any[], controller: (req: Request, res: Response, next: NextFunction) => void,) {
    switch(method) {
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