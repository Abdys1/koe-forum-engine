import logger from '@src/components/logger/logger';
import { AuthService } from '@src/components/auth/types';
import { Request, Response } from 'express';

class AuthController {
  private authService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
    this.registrate = this.registrate.bind(this);
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const isValidUser = await this.authService.verifyUser(username, password);
    if (isValidUser) {
      const tokens = await this.authService.generateTokens(username);
      logger.info(`${username}'s tokens has created`);
      res.status(200).send(tokens);
    } else {
      logger.error(`Wrong credentials! Username: ${username}`);
      res.status(401).send();
    }
  }

  public async refresh(req: Request, res: Response): Promise<void> {
    //TODO express-validator-ral validáljuk, hogy van-e refreshToken
    if (!req.body.refreshToken) {
      logger.error('Refresh token not found');
      res.status(401).send();
    } else {
      const tokens = await this.authService.refreshTokens(req.body.refreshToken);
      res.status(200).send(tokens);
    }
  }

  public async registrate(req: Request, res: Response): Promise<void> {
    const success = await this.authService.registrate(
      { username: req.body.username, password: req.body.password }
    );
    if (success) {
      res.status(200).send();
    } else {
      res.status(409).send('User already exists!');
    }
  }
}

export default AuthController;
