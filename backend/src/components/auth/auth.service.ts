import AuthenticationError from '#src/components/auth/authentication.error';
import logger from '#src/components/logger/logger';
import config from '#src/config';

class AuthService {
  #userDao;

  #pwdHasher;

  #tokenGenerator;

  constructor(userDao: any, pwdHasher: any, tokenGenerator: any) {
    this.#userDao = userDao;
    this.#pwdHasher = pwdHasher;
    this.#tokenGenerator = tokenGenerator;
  }

  async login(username: string, passwd: string) {
    const isValidPassword = await this.#verifyPassword(username, passwd);
    if (!isValidPassword) {
      throw new AuthenticationError(`Wrong credentials! Username: ${username}`);
    }

    return this.#generateTokens(username);
  }

  async #verifyPassword(username: string, rawPwd: string) {
    try {
      const hashPwd = await this.#userDao.findPwdByUsername(username);
      return await this.#pwdHasher.verify(hashPwd, rawPwd);
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  async #generateTokens(username: string) {
    const accessToken = await this.#signAccessToken(username);
    const refreshToken = await this.#signRefreshToken(username);
    return { accessToken, refreshToken };
  }

  async #signAccessToken(username: string) {
    return this.#tokenGenerator.signToken({ username }, config.auth.secrets.accessToken, '10m');
  }

  async #signRefreshToken(username: string) {
    return this.#tokenGenerator.signToken({ username }, config.auth.secrets.refreshToken, '1d');
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = await this.#verifyToken(refreshToken, config.auth.secrets.refreshToken);
    const accessToken = await this.#signAccessToken(payload.username);
    return accessToken;
  }

  async #verifyToken(token: string, secret: string) {
    try {
      return await this.#tokenGenerator.verifyToken(token, secret);
    } catch (err: any) {
      throw new AuthenticationError(err);
    }
  }

  async registrate(user: any) {
    const canRegistrate = !(await this.#userDao.existsByUsername(user.username));
    if (canRegistrate) {
      const hashedPwd = await this.#pwdHasher.hash(user.password);
      await this.#userDao.save({ username: user.username, password: hashedPwd });
      return true;
    }
    return false;
  }
}

export default AuthService;
