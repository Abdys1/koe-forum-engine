import AuthenticationError from './AuthenticationError.js';

class AuthController {
  #authService;

  constructor(authService) {
    this.#authService = authService;
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const { accessToken, refreshToken } = await this.#authService.login(username, password);
      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200);
      res.send({ accessToken });
    } catch (err) {
      if (err instanceof AuthenticationError) {
        res.send(401);
      } else {
        next(err);
      }
    }
  }
}

export default AuthController;
