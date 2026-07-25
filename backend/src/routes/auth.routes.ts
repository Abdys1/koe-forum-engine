import { authController } from '@src/components/auth';
import { defineRouter } from '@src/components/routerconf';
import { HttpMethod } from '@src/components/routerconf/router-config';
import { body } from 'express-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthTokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in with username and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 255
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 64
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokens'
 *       401:
 *         description: Wrong username or password
 */

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Exchange a refresh token for a new token pair
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens refreshed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokens'
 *       401:
 *         description: Refresh token missing or invalid
 */

/**
 * @openapi
 * /auth/registrate:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 255
 *               password:
 *                 type: string
 *                 maxLength: 64
 *                 description: Must satisfy express-validator's isStrongPassword rules
 *     responses:
 *       200:
 *         description: User registered
 *       409:
 *         description: A user with this username already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export default defineRouter([
    {
        path: '/login',
        method: HttpMethod.POST,
        public: true,
        middlewares: [
            body('username').isLength({ min: 4, max: 255 }),
            body('password').isLength({ min: 8, max: 64 }) // TODO ne írja ki, hogy milyen értéket adott meg a felhasználó, ha nem valid
        ],
        controller: authController.login
    },
    {
        path: '/refresh',
        method: HttpMethod.POST,
        public: true,
        controller: authController.refresh
    },
    {
        path: '/registrate',
        method: HttpMethod.POST,
        public: true,
        middlewares: [
            body('username').isLength({ min: 4, max: 255 }),
            body('password').isStrongPassword().isLength({ max: 64 })
        ],
        controller: authController.registrate
    }
]);
