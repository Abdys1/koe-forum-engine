import AuthenticationError from 'components/auth/AuthenticationError';
import logger from 'components/logger/Logger';
import UserDao from 'components/user/UserDao';

class AuthService {
  private userDao: UserDao;
  private pwdHasher: any;
  private tokenGenerator: any; //TODO adni neki egy típust
  private refreshTokenSecret: string;
  private accessTokenSecret: string;

  constructor(userDao: UserDao, pwdHasher: any, tokenGenerator: any) {
    this.userDao = userDao;
    this.pwdHasher = pwdHasher;
    this.tokenGenerator = tokenGenerator;
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';
  }

  public async login(username: string | undefined | null, passwd: string | undefined | null) {
    const isValidPassword = await this.verifyPassword(username, passwd);
    if (!isValidPassword) {
      throw new AuthenticationError(`Wrong credentials! Username: ${username}`);
    }

    return this.generateTokens(username);
  }

  private async verifyPassword(username: string | undefined | null, rawPwd: string | undefined | null): Promise<any> {
    try {
      const hashPwd = await this.userDao.findPwdByUsername(username);
      return await this.pwdHasher.verify(hashPwd, rawPwd);
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  private async generateTokens(username: string | undefined | null) {
    const accessToken = await this.signAccessToken(username);
    const refreshToken = await this.signRefreshToken(username);
    return { accessToken, refreshToken };
  }

  private async signAccessToken(username: string | undefined | null) {
    return this.tokenGenerator.signToken({ username }, this.accessTokenSecret, '10m');
  }

  private async signRefreshToken(username: string | undefined | null) {
    return this.tokenGenerator.signToken({ username }, this.refreshTokenSecret, '1d');
  }

  public async refreshAccessToken(refreshToken: string | undefined | null) {
    const payload = await this.verifyToken(refreshToken, this.refreshTokenSecret);
    const accessToken = await this.signAccessToken(payload.username);
    return accessToken;
  }

  private async verifyToken(token: string | undefined | null, secret: string | undefined | null) {
    try {
      return await this.tokenGenerator.verifyToken(token, secret);
    } catch (err: any) {
      throw new AuthenticationError(err);
    }
  }
}

export default AuthService;
