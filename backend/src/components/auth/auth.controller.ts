import logger from '@src/components/logger/logger';
import { AuthService } from '@src/components/auth/types';
import { Request, Response } from 'express';

class AuthController {
  private authService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const isValidUser = await this.authService.verifyUser(username, password);
    if (isValidUser) {
      const { accessToken, refreshToken } = await this.authService.generateTokens(username);
      logger.info(`${username}'s tokens has created`);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send({ accessToken });
    } else {
      logger.error(`Wrong credentials! Username: ${username}`);
      res.status(401).send();
    }
  }

  public async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      logger.error('Refresh token not found');
      res.status(401).send();
    } else {
      const accessToken = await this.authService.refreshAccessToken(refreshToken);
      res.status(200).send({ accessToken });
    }
  }

  public async registrate(req: Request, res: Response): Promise<void> {
    const success = await this.authService.registrate(
      { username: req.body.username, password: req.body.password }
    );
    if (success) {
      res.status(200).send();
    } else {
      res.status(409).send();
    }
  }
}

export default AuthController;
