import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import argon2 from 'argon2';
import AuthService from '#src/components/auth/AuthService.js';
import AuthenticationError from '#src/components/auth/AuthenticationError.js';
import FakeUserDao from '#src/components/user/__tests__/FakeUserDao.js';

class TestError extends Error {}

describe('AuthService', () => {
  let userDao;
  let tokenGenerator;
  let authService;

  beforeEach(() => {
    tokenGenerator = {
      signToken: vi.fn(),
      verifyToken: vi.fn(),
    };
    userDao = new FakeUserDao([{ username: 'admin', password: argon2.hash('admin') }, { username: 'admin2', password: argon2.hash('alma') }]);
    authService = new AuthService(userDao, argon2, tokenGenerator);
  });

  function checkJwtTokens(username, password, expectedToken) {
    tokenGenerator.signToken.mockImplementation(() => expectedToken);
    const expected = { accessToken: expectedToken, refreshToken: expectedToken };
    expect(authService.login(username, password)).resolves.toStrictEqual(expected);
  }

  describe('login()', () => {
    it('should be generate verifyable tokens for admin', () => {
      checkJwtTokens('admin', 'admin', 'TOKEN_FOR_ADMIN');
    });

    it('should be generate verifyable tokens for admin2', () => {
      checkJwtTokens('admin2', 'alma', 'TOKEN_FOR_ADMIN2');
    });

    it('should reject with invalid credentials', () => {
      expect(authService.login('admin5', 'admin2')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with invalid password', () => {
      expect(authService.login('admin', 'admin2')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with invalid username', () => {
      expect(authService.login('admin3', 'admin')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with empty credentials', () => {
      expect(authService.login('', '')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with empty username', () => {
      expect(authService.login('', 'admin')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with empty password', () => {
      expect(authService.login('admin', '')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with null credentials', () => {
      expect(authService.login(null, null)).rejects.toThrow(AuthenticationError);
    });

    it('should reject with null username', () => {
      expect(authService.login(null, 'admin')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with null password', () => {
      expect(authService.login('admin', null)).rejects.toThrow(AuthenticationError);
    });

    it('should reject with undefined username', () => {
      expect(authService.login(undefined, 'admin')).rejects.toThrow(AuthenticationError);
    });

    it('should reject with undefined password', () => {
      expect(authService.login('admin', undefined)).rejects.toThrow(AuthenticationError);
    });

    it('should reject with undefined credentials', () => {
      expect(authService.login(undefined, undefined)).rejects.toThrow(AuthenticationError);
    });
  });

  describe('refreshAccessToken()', () => {
    it('should return access token when refresh token is valid', () => {
      const token = `AccessToken_${new Date().valueOf()}`;

      tokenGenerator.verifyToken.mockImplementation(() => Promise.resolve({ username: 'teszt' }));
      tokenGenerator.signToken.mockImplementation(() => Promise.resolve(token));

      expect(authService.refreshAccessToken('refreshToken')).resolves.toBe(token);
    });

    it('should throw authentication error when refresh token is invalid', () => {
      tokenGenerator.verifyToken.mockImplementation(() => Promise.rejects(new Error()));

      expect(authService.refreshAccessToken('refreshToken')).rejects.toThrow(AuthenticationError);
    });

    it('should throw unexpected error when cannot sign token', () => {
      tokenGenerator.verifyToken.mockImplementation(() => Promise.resolve({ username: 'teszt' }));
      tokenGenerator.signToken.mockImplementation(() => Promise.reject(new TestError()));

      expect(authService.refreshAccessToken('refreshToken')).rejects.toThrow(TestError);
    });
  });

  describe('registrate()', () => {
    it('dont save user when username already exists', async () => {
      vi.spyOn(userDao, 'save');
      const user = { username: 'admin', password: 'tesztPwd' };

      const success = await authService.registrate(user);

      expect(success).toBe(false);
      expect(userDao.save).toHaveBeenCalledTimes(0);
    });

    it('should save user when username doesnt exists', async () => {
      vi.spyOn(userDao, 'save');
      const user = { username: 'test', password: 'tesztPwd' };

      expect(userDao.isUserSaved(user.username, user.password)).toBe(false);

      const success = await authService.registrate(user);

      expect(success).toBe(true);
      expect(userDao.save).toHaveBeenCalledTimes(1);
      expect(userDao.isUserSaved(user.username, user.password)).toBe(true);
    });
  });
});
