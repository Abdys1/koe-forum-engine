import argon2 from 'argon2';

import AuthController from '#src/components/auth/AuthController.js';
import useAuthMiddleware from '#src/components/auth/AuthMiddleware.js';
import AuthService from '#src/components/auth/AuthService.js';
import * as tokenGenerator from '#src/components/auth/JwtTokenGenerator.js';
import PUBLIC_PATHS from '#src/components/auth/PublicPaths.js';
import { userDao } from '#src/components/user/index.js';

const authMiddleware = useAuthMiddleware(tokenGenerator.verifyToken, PUBLIC_PATHS);
const authService = new AuthService(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

export { authController, authMiddleware };
