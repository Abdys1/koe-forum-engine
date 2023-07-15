import jwt from 'jsonwebtoken';
import AuthenticationError from './authentication.error';

async function signToken(payload, secretKey, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, (err, signedToken) => {
      if (err) { reject(err); }
      resolve(signedToken);
    }, { expiresIn });
  });
}

class AuthService {
  #accessTokenSecret;

  #refreshTokenSecret;

  #userDao;

  constructor(userDao) {
    this.#accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    this.#refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    this.#userDao = userDao;
  }

  async login(username, passwd) {
    const foundPwd = await this.#userDao.findPwdByUsername(username);
    if (foundPwd !== passwd) {
      return Promise.reject(new AuthenticationError('Wrong credentials!'));
    }

    const accessToken = await signToken({ username }, this.#accessTokenSecret, '10m');
    const refreshToken = await signToken({ username }, this.#refreshTokenSecret, '1d');
    return { accessToken, refreshToken };
  }
}

export default AuthService;
