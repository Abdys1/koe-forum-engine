import argon2 from 'argon2';

import AuthController from '@src/components/auth/auth.controller';
import useAuthMiddleware from '@src/components/auth/auth.middleware';
import AuthServiceImpl from '@src/components/auth/auth.service';
import * as tokenGenerator from '@src/components/auth/jwt-token-generator';
import PUBLIC_PATHS from '@src/components/auth/public-paths';
import { userDao } from '@src/components/user';

const authMiddleware = useAuthMiddleware(tokenGenerator.verifyToken, PUBLIC_PATHS);
const authService = new AuthServiceImpl(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

export { authController, authMiddleware };
