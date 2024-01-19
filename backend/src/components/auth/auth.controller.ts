import logger from '@src/components/logger/logger';
import { AuthService } from '@src/components/auth/types';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  private authService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      // TODO szedjük szét verifyUser-re és generateTokens-re
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
      // TODO itt kezeljük ha nem jó az authentikáció, mert az üzleti hiba
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
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

  async registrate(req: Request, res: Response) {
    const success = await this.authService.registrate(
      { username: req.body.username, password: req.body.password },
    );
    if (success) {
      res.status(200).send();
    } else {
      res.status(409).send();
    }
  }
}

export default AuthController;
