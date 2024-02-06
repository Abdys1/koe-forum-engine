import AuthenticationError from '@src/components/auth/authentication.error';
import logger from '@src/components/logger/logger';
import config from '@src/config';
import { UserDao } from '@src/components/user/types';
import { AuthService, AuthTokens, ForumJwtPayload, PasswordHasher, TokenGenerator } from '@src/components/auth/types';

class AuthServiceImpl implements AuthService {
  private userDao;
  private pwdHasher;
  private tokenGenerator;

  // TODO a configot is injektáljuk be és úgy teszteljük
  public constructor(userDao: UserDao, pwdHasher: PasswordHasher, tokenGenerator: TokenGenerator) {
    this.userDao = userDao;
    this.pwdHasher = pwdHasher;
    this.tokenGenerator = tokenGenerator;
  }

  public async verifyUser(username: string, rawPwd: string): Promise<boolean> {
    try {
      const hashPwd = await this.userDao.findPwdByUsername(username) || '';
      return await this.pwdHasher.verify(hashPwd, rawPwd);
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  public async generateTokens(username: string): Promise<AuthTokens> {
    const accessToken = await this.signAccessToken(username);
    const refreshToken = await this.signRefreshToken(username);
    return { accessToken, refreshToken };
  }

  private async signAccessToken(username: string): Promise<string | undefined> {
    return this.tokenGenerator.signToken({ username }, config.auth.secrets.accessToken, '10m');
  }

  private async signRefreshToken(username: string): Promise<string | undefined> {
    return this.tokenGenerator.signToken({ username }, config.auth.secrets.refreshToken, '1d');
  }

  public async refreshAccessToken(refreshToken: string): Promise<string | undefined> {
    const payload = await this.verifyToken(refreshToken, config.auth.secrets.refreshToken);
    const accessToken = await this.signAccessToken(payload.username);
    logger.info(`New access token has created! Username: ${payload.username}`);
    return accessToken;
  }

  private async verifyToken(token: string, secret: string): Promise<ForumJwtPayload> {
    try {
      return await this.tokenGenerator.verifyToken(token, secret);
    } catch (err: unknown) {
      logger.error(err);
      let msg = "Token verification failed!";
      if (err instanceof Error) {
        msg += '\n' + err.message;
      }
      throw new AuthenticationError(msg);
    }
  }

  public async registrate(user: { username: string, password: string }): Promise<boolean> {
    const usernameNotExists = !(await this.userDao.existsByUsername(user.username));
    if (usernameNotExists) {
      const hashedPwd = await this.pwdHasher.hash(user.password);
      await this.userDao.save({ username: user.username, password: hashedPwd });
      return true;
    }
    return false;
  }
}

export default AuthServiceImpl;