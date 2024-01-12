import AuthenticationError from '#src/components/auth/AuthenticationError.js';
import logger from '#src/components/logger/Logger.js';
import config from '#src/Config.js';

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
    const isValidPassword = await this.#verifyPassword(username, passwd);
    if (!isValidPassword) {
      throw new AuthenticationError(`Wrong credentials! Username: ${username}`);
    }

    return this.#generateTokens(username);
  }

  async #verifyPassword(username, rawPwd) {
    try {
      const hashPwd = await this.#userDao.findPwdByUsername(username);
      return await this.#pwdHasher.verify(hashPwd, rawPwd);
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  async #generateTokens(username) {
    const accessToken = await this.#signAccessToken(username);
    const refreshToken = await this.#signRefreshToken(username);
    return { accessToken, refreshToken };
  }

  async #signAccessToken(username) {
    return this.#tokenGenerator.signToken({ username }, config.auth.secrets.accessToken, '10m');
  }

  async #signRefreshToken(username) {
    return this.#tokenGenerator.signToken({ username }, config.auth.secrets.refreshToken, '1d');
  }

  async refreshAccessToken(refreshToken) {
    const payload = await this.#verifyToken(refreshToken, config.auth.secrets.refreshToken);
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

  async registrate({ username, password }) {
    const canRegistrate = !(await this.#userDao.existsByUsername(username));
    if (canRegistrate) {
      const hashedPwd = await this.#pwdHasher.hash(password);
      await this.#userDao.save({ username, password: hashedPwd });
      return true;
    }
    return false;
  }
}

export default AuthService;
