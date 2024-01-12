import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';

import AuthenticationError from '#src/components/auth/AuthenticationError.js';
import AuthService from '#src/components/auth/AuthService.js';
import FakeUserDao from '#src/components/user/FakeUserDao.js';

class TestError extends Error {}

describe('AuthService', () => {
  let testUser;
  let pwdHasher;
  let userDao;
  let tokenGenerator;
  let authService;

  beforeEach(async () => {
    tokenGenerator = {
      signToken: vi.fn(),
      verifyToken: vi.fn(),
    };
    pwdHasher = {
      hash: vi.fn(),
      verify: vi.fn(),
    };
    testUser = FakeUserDao.createTestUser();
    userDao = new FakeUserDao();
    await userDao.save(testUser);
    authService = new AuthService(userDao, pwdHasher, tokenGenerator);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login()', () => {
    it('should be generate verifyable tokens for registered user', async () => {
      const expectedToken = `RANDOM_TOKEN_${Date.now()}`;
      tokenGenerator.signToken.mockReturnValue(expectedToken);
      pwdHasher.verify.mockResolvedValueOnce(true);

      const tokens = await authService.login(testUser.username, testUser.password);

      expect(tokens.accessToken).toBe(expectedToken);
      expect(tokens.refreshToken).toBe(expectedToken);
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
      const token = `AccessToken_${Math.floor(Date.now() + Math.random())}`;

      tokenGenerator.verifyToken.mockResolvedValueOnce({ username: 'teszt' });
      tokenGenerator.signToken.mockResolvedValueOnce(token);

      expect(authService.refreshAccessToken('refreshToken')).resolves.toBe(token);
    });

    it('should throw authentication error when refresh token is invalid', () => {
      tokenGenerator.verifyToken.mockRejectedValueOnce(new Error());

      expect(authService.refreshAccessToken('refreshToken')).rejects.toThrow(AuthenticationError);
    });

    it('should throw unexpected error when cannot sign token', () => {
      tokenGenerator.verifyToken.mockResolvedValueOnce({ username: 'teszt' });
      tokenGenerator.signToken.mockRejectedValueOnce(new TestError());

      expect(authService.refreshAccessToken('refreshToken')).rejects.toThrow(TestError);
    });
  });

  describe('registrate()', () => {
    it('dont registrate when user already exists', async () => {
      pwdHasher.hash.mockImplementation((pwd) => pwd);
      vi.spyOn(userDao, 'save');

      const success = await authService.registrate(testUser);

      expect(success).toBe(false);
      expect(userDao.save).toHaveBeenCalledTimes(0);
    });

    it('should registrate when user doesnt exists', async () => {
      pwdHasher.hash.mockImplementation((pwd) => pwd);
      vi.spyOn(userDao, 'save');
      const user = FakeUserDao.createTestUser();

      expect(userDao.isUserSaved(user)).toBe(false);

      const success = await authService.registrate(user);

      expect(success).toBe(true);
      expect(userDao.save).toHaveBeenCalledOnce();
      expect(userDao.isUserSaved(user)).toBe(true);
    });

    it('should hash password', async () => {
      const hashPrefix = `HASHED_${Date.now()}`;
      pwdHasher.hash.mockImplementation((pwd) => `${hashPrefix}_${pwd}`);
      const user = FakeUserDao.createTestUser();

      const success = await authService.registrate(user);
      const hashedPwd = await userDao.findPwdByUsername(user.username);

      expect(success).toBe(true);
      expect(hashedPwd).toBe(`${hashPrefix}_${user.password}`);
    });
  });
});
