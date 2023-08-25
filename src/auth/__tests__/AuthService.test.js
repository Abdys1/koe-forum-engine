import {
  describe, it, expect, vi, beforeAll, beforeEach,
} from 'vitest';
import argon2 from 'argon2';
import AuthService from '#src/auth/AuthService.js';
import AuthenticationError from '#src/auth/AuthenticationError.js';

class TestError extends Error {}

describe('AuthService', () => {
  let userDao;
  let tokenGenerator;
  let authService;

  beforeAll(() => {
    userDao = {
      fakeUsers: [{ username: 'admin', passwd: argon2.hash('admin') }, { username: 'admin2', passwd: argon2.hash('alma') }],
      async findPwdByUsername(username) {
        if (!username) {
          throw new Error('Undefinded username');
        }
        const result = this.fakeUsers.find((user) => user.username === username);
        return result?.passwd;
      },
    };
    tokenGenerator = {
      signToken: vi.fn(),
      verifyToken: vi.fn(),
    };
  });

  beforeEach(() => {
    authService = new AuthService(userDao, argon2, tokenGenerator);
  });

  function checkJwtTokens(username, password, expectedToken) {
    tokenGenerator.signToken.mockImplementation(() => expectedToken);
    const expected = { accessToken: expectedToken, refreshToken: expectedToken };
    expect(authService.login(username, password)).resolves.toStrictEqual(expected);
  }

  it('login() should be generate verifyable tokens for admin', () => {
    checkJwtTokens('admin', 'admin', 'TOKEN_FOR_ADMIN');
  });

  it('login() should be generate verifyable tokens for admin2', () => {
    checkJwtTokens('admin2', 'alma', 'TOKEN_FOR_ADMIN2');
  });

  it('login() should reject with invalid credentials', () => {
    expect(authService.login('admin5', 'admin2')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with invalid password', () => {
    expect(authService.login('admin', 'admin2')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with invalid username', () => {
    expect(authService.login('admin3', 'admin')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with empty credentials', () => {
    expect(authService.login('', '')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with empty username', () => {
    expect(authService.login('', 'admin')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with empty password', () => {
    expect(authService.login('admin', '')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with null credentials', () => {
    expect(authService.login(null, null)).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with null username', () => {
    expect(authService.login(null, 'admin')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with null password', () => {
    expect(authService.login('admin', null)).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with undefined username', () => {
    expect(authService.login(undefined, 'admin')).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with undefined password', () => {
    expect(authService.login('admin', undefined)).rejects.toThrow(AuthenticationError);
  });

  it('login() should reject with undefined credentials', () => {
    expect(authService.login(undefined, undefined)).rejects.toThrow(AuthenticationError);
  });

  it('refreshAccessToken() should return access token when refresh token is valid', () => {
    const token = `AccessToken_${new Date().valueOf()}`;

    tokenGenerator.verifyToken.mockImplementation(() => Promise.resolve({ username: 'teszt' }));
    tokenGenerator.signToken.mockImplementation(() => Promise.resolve(token));

    expect(authService.refreshAccessToken('refreshToken')).resolves.toBe(token);
  });

  it('refreshAccessToken() should throw authentication error when refresh token is invalid', () => {
    tokenGenerator.verifyToken.mockImplementation(() => Promise.rejects(new Error()));

    expect(authService.refreshAccessToken('refreshToken')).rejects.toThrow(AuthenticationError);
  });

  it('refreshAccessToken() should throw unexpected error when cannot sign token', () => {
    tokenGenerator.verifyToken.mockImplementation(() => Promise.resolve({ username: 'teszt' }));
    tokenGenerator.signToken.mockImplementation(() => Promise.reject(new TestError()));

    expect(authService.refreshAccessToken('refreshToken')).rejects.toThrow(TestError);
  });
});
