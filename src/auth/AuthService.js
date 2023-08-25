import AuthenticationError from '#src/auth/AuthenticationError.js';

class AuthService {
  #userDao;

  #pwdHasher;

  #tokenGenerator;

  constructor(userDao, pwdHasher, tokenGenerator) {
    this.#userDao = userDao;
    this.#pwdHasher = pwdHasher;
    this.#tokenGenerator = tokenGenerator;
  }

  async login(username, passwd) {
    const hashPwd = await this.#userDao.findPwdByUsername(username);
    const isValidPassword = await this.#verifyPassword(hashPwd, passwd);
    if (!isValidPassword) {
      throw new AuthenticationError('Wrong credentials');
    }

    return this.#generateTokens(username);
  }

  async #verifyPassword(hashPwd, rawPwd) {
    try {
      return await this.#pwdHasher.verify(hashPwd, rawPwd);
    } catch (err) {
      return false;
    }
  }

  async #generateTokens(username) {
    const accessToken = await this.#signAccessToken(username);
    const refreshToken = await this.#signRefreshToken(username);
    return { accessToken, refreshToken };
  }

  async #signAccessToken(username) {
    return this.#tokenGenerator.signToken({ username }, process.env.ACCESS_TOKEN_SECRET, '10m');
  }

  async #signRefreshToken(username) {
    return this.#tokenGenerator.signToken({ username }, process.env.REFRESH_TOKEN_SECRET, '1d');
  }

  async refreshAccessToken(refreshToken) {
    const payload = await this.#verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = await this.#signAccessToken(payload.username);
    return accessToken;
  }

  async #verifyToken(token, secret) {
    try {
      return await this.#tokenGenerator.verifyToken(token, secret);
    } catch (err) {
      throw new AuthenticationError(err);
    }
  }
}

export default AuthService;
