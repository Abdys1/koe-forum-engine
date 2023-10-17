import argon2 from 'argon2';
import * as tokenGenerator from 'components/auth/JwtTokenGenerator';
import { userDao } from 'components/user/index';
import AuthService from 'components/auth/AuthService';
import AuthController from 'components/auth/AuthController';
import useAuthMiddleware from 'components/auth/AuthMiddleware';
import PUBLIC_PATHS from 'components/auth/PublicPaths';

const authMiddleware = useAuthMiddleware(tokenGenerator.verifyToken, PUBLIC_PATHS);
const authService = new AuthService(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

export { authController, authMiddleware };
