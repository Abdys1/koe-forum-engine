import argon2 from 'argon2';
import * as tokenGenerator from './TokenGenerator.js';
import userDao from '../user/index.js';
import AuthService from './AuthService.js';
import AuthController from './AuthController.js';

const authService = new AuthService(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

export { authController, authService };
