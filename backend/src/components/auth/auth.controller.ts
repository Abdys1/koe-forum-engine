import logger from '#src/components/logger/logger';

class AuthController {
  #authService;

  constructor(authService: any) {
    this.#authService = authService;
  }

  async login(req: any, res: any, next: any) {
    try {
      const { username, password } = req.body;
      // TODO szedjük szét verifyUser-re és generateTokens-re
      const { accessToken, refreshToken } = await this.#authService.login(username, password);
      logger.info(`${username}'s tokens has created`);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send({ accessToken });
    } catch (err) {
      // TODO itt kezeljük ha nem jó az authentikáció, mert az üzleti hiba
      next(err);
    }
  }

  async refresh(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        logger.error('Refresh token not found');
        res.status(401).send();
      } else {
        const accessToken = await this.#authService.refreshAccessToken(refreshToken);
        logger.info('New access token has created');
        res.status(200).send({ accessToken });
      }
    } catch (err) {
      next(err);
    }
  }

  async registrate(req: any, res: any, next: any) {
    const success = await this.#authService.registrate(
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
