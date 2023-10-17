import logger from 'components/logger/Logger.js';
import AuthService from 'components/auth/AuthService';
import { Request, Response } from 'express-serve-static-core';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response, next: Function) {
    try {
      const { username, password } = req.body;
      const { accessToken, refreshToken } = await this.authService.login(username, password);
      logger.info(`${username}'s tokens has created`);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: Function) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        logger.error('Refresh token not found');
        res.status(401).send();
      } else {
        const accessToken = await this.authService.refreshAccessToken(refreshToken);
        logger.info('New access token has created');
        res.status(200).send({ accessToken });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
