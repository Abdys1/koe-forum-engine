import { authController } from '@src/components/auth';
import { defineRouter } from '@src/components/routerconf';
import { HttpMethod } from '@src/components/routerconf/router-config';
import asyncHandler from '@src/utils/async-handler';
import { body } from 'express-validator';

export default defineRouter([
    { 
        path: '/login', 
        method: HttpMethod.POST, 
        public: true,
        middlewares: [
            body('username').isLength({ min: 4, max: 255 }), 
            body('password').isLength({ min: 8, max: 64 }) // TODO ne írja ki, hogy milyen értéket adott meg a felhasználó, ha nem valid
        ],
        controller: asyncHandler(authController.login)
    },
    {
        path: '/refresh', 
        method: HttpMethod.POST, 
        public: true,
        controller: asyncHandler(authController.refresh)
    },
    { 
        path: '/registrate', 
        method: HttpMethod.POST,
        public: true,
        middlewares: [
            body('username').isLength({ min: 4, max: 255 }), 
            body('password').isStrongPassword().isLength({ max: 64 })
        ],
        controller: asyncHandler(authController.registrate)
    }
]);
