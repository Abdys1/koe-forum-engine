import {
  describe, it, expect, vi, beforeEach, afterEach, Mocked,
} from 'vitest';

import AuthServiceImpl from '@src/components/auth/auth.service';
import AuthenticationError from '@src/components/auth/authentication.error.js';

import FakeUserDao from '@test/components/user/fake-user.dao';
import { ForumUser } from '@src/components/user/types';
import { PasswordHasher, TokenGenerator, AuthService } from '@src/components/auth/types';

class TestError extends Error {}

describe('AuthService', () => {
  let testUser: ForumUser;
  let pwdHasher: Mocked<PasswordHasher>;
  let userDao: FakeUserDao;
  let tokenGenerator: Mocked<TokenGenerator>;
  let authService: AuthService;

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
    authService = new AuthServiceImpl(userDao, pwdHasher, tokenGenerator);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login()', () => {
    it('should be generate verifyable tokens for registered user', async () => {
      const expectedToken = `RANDOM_TOKEN_${Date.now()}`;
      tokenGenerator.signToken.mockResolvedValue(expectedToken);
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
      pwdHasher.hash.mockImplementation((pwd) => Promise.resolve(pwd));
      vi.spyOn(userDao, 'save');

      const success = await authService.registrate(testUser);

      expect(success).toBe(false);
      expect(userDao.save).toHaveBeenCalledTimes(0);
    });

    it('should registrate when user doesnt exists', async () => {
      pwdHasher.hash.mockImplementation((pwd) => Promise.resolve(pwd));
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
      pwdHasher.hash.mockImplementation((pwd) => Promise.resolve(`${hashPrefix}_${pwd}`));
      const user = FakeUserDao.createTestUser();

      const success = await authService.registrate(user);
      const hashedPwd = await userDao.findPwdByUsername(user.username);

      expect(success).toBe(true);
      expect(hashedPwd).toBe(`${hashPrefix}_${user.password}`);
    });
  });
});
