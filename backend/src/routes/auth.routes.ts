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
            body('password').isLength({ min: 8, max: 64 })
        ],
        controller: asyncHandler(async (req, res) => await authController.login(req, res))
    },
    {
        path: '/refresh', 
        method: HttpMethod.POST, 
        public: true,
        controller: asyncHandler(async (req, res) => await authController.refresh(req, res))
    },
    { 
        path: '/registrate', 
        method: HttpMethod.POST,
        public: true,
        middlewares: [
            body('username').isLength({ min: 4, max: 255 }), 
            body('password').isStrongPassword().isLength({ max: 64 })
        ],
        controller: asyncHandler(async (req, res) => await authController.registrate(req, res))
    }
]);
