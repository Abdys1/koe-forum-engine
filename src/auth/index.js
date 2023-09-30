import argon2 from 'argon2';
import * as tokenGenerator from '#src/auth/JwtTokenGenerator.js';
import { userDao } from '#src/user/index.js';
import AuthService from '#src/auth/AuthService.js';
import AuthController from '#src/auth/AuthController.js';
import useAuthMiddleware from '#src/auth/AuthMiddleware.js';
import { PUBLIC_PATHS } from '#src/Paths.js';

const authMiddleware = useAuthMiddleware(tokenGenerator.verifyToken, PUBLIC_PATHS);
const authService = new AuthService(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

export { authController, authMiddleware };
