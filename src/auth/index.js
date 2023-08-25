import argon2 from 'argon2';
import * as tokenGenerator from '#src/auth/TokenGenerator.js';
import userDao from '#src/user/index.js';
import AuthService from '#src/auth/AuthService.js';
import AuthController from '#src/auth/AuthController.js';

const authService = new AuthService(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

// eslint-disable-next-line import/prefer-default-export
export { authController };
