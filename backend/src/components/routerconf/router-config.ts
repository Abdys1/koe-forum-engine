/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationMiddleware } from "@src/middlewares/types";
import { RequestHandler, Router } from "express";

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
            addRoute(router, c.method, c.path, middlewares, c.controller);
        });
        return router;
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