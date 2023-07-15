import {
  describe, it, expect, vi, beforeAll, beforeEach, afterAll,
} from 'vitest';
import jwt from 'jsonwebtoken';
import AuthService from './auth.service.js';
import AuthenticationError from './authentication.error.js';

describe('Auth service login', () => {
  let secretKey;
  let userDao;
  let authService;

  beforeAll(() => {
    secretKey = 'secret';
    vi.stubEnv('ACCESS_TOKEN_SECRET', secretKey);
    vi.stubEnv('REFRESH_TOKEN_SECRET', secretKey);
    userDao = {
      fakeUsers: [{ username: 'admin', passwd: 'admin' }, { username: 'admin2', passwd: 'admin' }],
      async findPwdByUsername(username) {
        const result = this.fakeUsers.find((user) => user.username === username);
        return Promise.resolve(result?.passwd);
      },
    };
  });

  beforeEach(() => {
    authService = new AuthService(userDao);
  });

  async function checkWrongCredentials(username, passwd) {
    try {
      await authService.login(username, passwd);
    } catch (err) {
      expect(err).toBeInstanceOf(AuthenticationError);
      expect(err.message).toBe('Wrong credentials!');
    }
  }

  async function verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err) => {
        if (err) { reject(err); }
        resolve(true);
      });
    });
  }

  async function checkTokens(tokens) {
    const { accessToken } = tokens;
    expect(accessToken).toBeTruthy();
    expect(accessToken.length).toBeGreaterThan(0);
    expect(await verifyToken(accessToken)).toBeTruthy();

    const { refreshToken } = tokens;
    expect(refreshToken).toBeTruthy();
    expect(refreshToken.length).toBeGreaterThan(0);
    expect(await verifyToken(refreshToken)).toBeTruthy();
  }

  it('should be generate verifyable tokens with valid credentials', async () => {
    const tokens = await authService.login('admin', 'admin');
    await checkTokens(tokens);
    const tokens2 = await authService.login('admin2', 'admin');
    await checkTokens(tokens2);
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

  afterAll(() => {
    vi.unstubAllEnvs();
  });
});
