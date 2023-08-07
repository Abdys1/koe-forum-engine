import AuthenticationError from './AuthenticationError.js';

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
    const hash = await this.#userDao.findPwdByUsername(username);
    const matched = await this.#pwdHasher.verify(hash, passwd);
    if (!matched) {
      return Promise.reject(new AuthenticationError('Wrong credentials!'));
    }

    const accessToken = await this.#tokenGenerator.signToken({ username }, process.env.ACCESS_TOKEN_SECRET, '10m');
    const refreshToken = await this.#tokenGenerator.signToken({ username }, process.env.REFRESH_TOKEN_SECRET, '1d');
    return { accessToken, refreshToken };
  }
}

export default AuthService;
