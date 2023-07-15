import AuthenticationError from './authentication.error.js';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const { accessToken, refreshToken } = await this.authService.login(username, password);
      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.send(200, { accessToken });
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
