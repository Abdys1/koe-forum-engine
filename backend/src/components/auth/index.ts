import argon2 from 'argon2';

import AuthController from '@src/components/auth/auth.controller';
import AuthServiceImpl from '@src/components/auth/auth.service';
import * as tokenGenerator from '@src/components/auth/jwt-token-generator';
import { userDao } from '@src/components/user';

const authService = new AuthServiceImpl(userDao, argon2, tokenGenerator);
const authController = new AuthController(authService);

export { authController };
