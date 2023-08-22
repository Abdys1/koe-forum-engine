class AuthController {
  #authService;

  constructor(authService) {
    this.#authService = authService;
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const { accessToken, refreshToken } = await this.#authService.login(username, password);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        res.status(401).send();
      } else {
        const accessToken = await this.#authService.refreshAccessToken(refreshToken);
        res.status(200).send({ accessToken });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
