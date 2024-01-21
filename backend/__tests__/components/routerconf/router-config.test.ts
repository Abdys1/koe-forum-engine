import { Router } from "express";
import { describe, it, expect } from "vitest";
import { AuthenticationMiddleware } from "@src/middlewares/types";
import { RouterConfig, useDefineRouter } from "@src/components/routerconf/router-config";

describe('Router configurator', () => {
    let authMiddleware: AuthenticationMiddleware;
    let defineRouter: (config: RouterConfig[]) => Router;

    beforeEach(() => {
        authMiddleware = vi.fn();
        defineRouter = useDefineRouter(authMiddleware);
    });

    function getRoutes(router: Router): Array<any> {
        return router.stack.map(r => r.route);
    }

    function assertRoute(routes: Array<any>, path: string, stackSize: number, method: string) {
        const currentRoute = routes.find(r => r.path === path);
        expect(currentRoute).toBeTruthy();
        expect(currentRoute.stack.length).toBe(stackSize);
        const currentStack = currentRoute.stack.find(s => s.method.toLowerCase() === method.toLowerCase());
        expect(currentStack).toBeTruthy();
    }

    it('defineRouter shouldnt set auth middleware when route is public', () => {
        const path = '/';
        const method = 'GET';
        const router: Router = defineRouter([{ path, method, controller: vi.fn(), public: true }]);
        
        expect(router).toBeTruthy();

        const routes = getRoutes(router);

        expect(routes.length).toBe(1);
        assertRoute(routes, path, 1, method);
    });

    it('defineRouter should set auth middleware when route is not public', () => {
        const path = '/test';
        const method = 'GET';
        const router: Router = defineRouter([{ path, method, controller: vi.fn(), public: false }]);
        
        expect(router).toBeTruthy();

        const routes = getRoutes(router);
        expect(routes.length).toBe(1);
        assertRoute(routes, path, 2, method);
        routes[0].stack[0].handle();
        expect(authMiddleware).toHaveBeenCalledOnce();
    });

    it('defineRouter should set auth middleware when routes public field is not defined', () => {
        const path = '/test/test1';
        const method = 'GET';
        const router: Router = defineRouter([{ path, method, controller: vi.fn() }]);

        expect(router).toBeTruthy();

        const routes = getRoutes(router);
        expect(routes.length).toBe(1);
        assertRoute(routes, path, 2, method);
        routes[0].stack[0].handle();
        expect(authMiddleware).toHaveBeenCalledOnce();
    });

    it('defineRouter should set controller func', () => {
        const controllerFunc = vi.fn();
        const router: Router = defineRouter([{ path: '/controller/test', method: 'GET', controller: controllerFunc, public: true }]);

        const routes = getRoutes(router);
        expect(routes.length).toBe(1);
        expect(routes[0].stack.length).toBe(1);
        routes[0].stack[0].handle();
        expect(controllerFunc).toHaveBeenCalledOnce();
    });

    it('defineRouter should support all http method', () => {
        const controllerFunc  = vi.fn();
        const router: Router = defineRouter([
            { path: '/firstRoot', method: 'GET', controller: controllerFunc, public: true },
            { path: '/secondRoot', method: 'POST', controller: controllerFunc },
            { path: '/thirdRoot', method: 'PUT', controller: controllerFunc, public: true },
            { path: '/4thRoot', method: 'DELETE', controller: controllerFunc, public: true }
        ]);

        expect(router).toBeTruthy();

        const routes = getRoutes(router);

        expect(routes.length).toBe(4);
        assertRoute(routes, '/firstRoot', 1, 'GET');
        assertRoute(routes, '/secondRoot', 2, 'POST');
        assertRoute(routes, '/thirdRoot', 1, 'PUT');
        assertRoute(routes, '/4thRoot', 1, 'DELETE');
    });
});