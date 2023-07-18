import AuthService from './auth.service.js';
import AuthController from './auth.controller.js';
import userDao from '../user/index.js';

const authService = new AuthService(userDao);
const authController = new AuthController(authService);

export { authController, authService };
