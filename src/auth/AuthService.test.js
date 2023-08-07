import {
  describe, it, expect, vi, beforeAll, beforeEach,
} from 'vitest';
import AuthService from './AuthService.js';
import AuthenticationError from './AuthenticationError.js';

describe('Auth service login', () => {
  let userDao;
  let pwdHasher;
  let tokenGenerator;
  let authService;

  beforeAll(() => {
    userDao = {
      fakeUsers: [{ username: 'admin', passwd: 'admin' }, { username: 'admin2', passwd: 'alma' }],
      async findPwdByUsername(username) {
        const result = this.fakeUsers.find((user) => user.username === username);
        return Promise.resolve(result?.passwd);
      },
    };
    pwdHasher = {
      verify: (hash, pwd) => hash === pwd,
    };
    tokenGenerator = {
      signToken: vi.fn(),
    };
  });

  beforeEach(() => {
    authService = new AuthService(userDao, pwdHasher, tokenGenerator);
  });

  async function checkWrongCredentials(username, passwd) {
    try {
      await authService.login(username, passwd);
    } catch (err) {
      expect(err).toBeInstanceOf(AuthenticationError);
      expect(err.message).toBe('Wrong credentials!');
    }
  }

  async function checkJwtTokens(username, password, expectedToken) {
    tokenGenerator.signToken.mockImplementation(() => expectedToken);
    const { accessToken, refreshToken } = await authService.login(username, password);
    expect(accessToken).toBe(expectedToken);
    expect(refreshToken).toBe(expectedToken);
  }

  it('should be generate verifyable tokens for admin', async () => {
    checkJwtTokens('admin', 'admin', 'TOKEN_FOR_ADMIN');
  });

  it('should be generate verifyable tokens for admin2', async () => {
    checkJwtTokens('admin2', 'alma', 'TOKEN_FOR_ADMIN2');
  });

  it('should reject with invalid credentials', () => {
    checkWrongCredentials('admin5', 'admin2');
  });

  it('should reject with invalid password', () => {
    checkWrongCredentials('admin', 'admin2');
  });

  it('should reject with invalid username', () => {
    checkWrongCredentials('admin3', 'admin');
  });

  it('should reject with empty credentials', () => {
    checkWrongCredentials('', '');
  });

  it('should reject with empty username', () => {
    checkWrongCredentials('', 'admin');
  });

  it('should reject with empty password', () => {
    checkWrongCredentials('admin', '');
  });

  it('should reject with null credentials', () => {
    checkWrongCredentials(null, null);
  });

  it('should reject with null username', () => {
    checkWrongCredentials(null, 'admin');
  });

  it('should reject with null password', () => {
    checkWrongCredentials('admin', null);
  });

  it('should reject with undefined username', () => {
    checkWrongCredentials(undefined, 'admin');
  });

  it('should reject with undefined password', () => {
    checkWrongCredentials('admin', undefined);
  });

  it('should reject with undefined credentials', () => {
    checkWrongCredentials(undefined, undefined);
  });
});
