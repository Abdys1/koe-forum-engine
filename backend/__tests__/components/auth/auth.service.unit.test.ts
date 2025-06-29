import AuthServiceImpl from '@src/components/auth/auth.service';
import AuthenticationError from '@src/components/auth/authentication.error.js';
import { AuthService, PasswordHasher, TokenGenerator } from '@src/components/auth/types';
import { ForumUser } from '@src/components/user/types';
import FakeUserDao from '@test/components/user/utils/fake-user.dao';
import {
  afterEach, beforeEach, describe, expect, it, Mocked,
  vi,
} from 'vitest';

class TestError extends Error { }

describe('AuthService', () => {
  let savedUser: ForumUser;
  let pwdHasher: PasswordHasher;
  let userDao: FakeUserDao;
  let tokenGenerator: Mocked<TokenGenerator>;
  let authService: AuthService;

  beforeEach(async () => {
    tokenGenerator = {
      signToken: vi.fn(),
      verifyToken: vi.fn(),
    };
    pwdHasher = {
      hash: pwd => Promise.resolve(`HASHED_${pwd}`),
      verify: (hashedPwd, rawPwd) => Promise.resolve(hashedPwd === `HASHED_${rawPwd}`),
    };
    userDao = new FakeUserDao();

    savedUser = FakeUserDao.createTestUser();
    await userDao.save({ username: savedUser.username, password: await pwdHasher.hash(savedUser.password) });

    authService = new AuthServiceImpl(userDao, pwdHasher, tokenGenerator);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateTokens()', () => {
    // TODO teszteljük a configból érkező secretekkel
    it('should be generate verifyable tokens', async () => {
      const expectedToken = `RANDOM_TOKEN_${Date.now()}`;
      tokenGenerator.signToken.mockResolvedValue(expectedToken);

      const { accessToken, refreshToken } = await authService.generateTokens(savedUser.username);

      expect(accessToken).toBe(expectedToken);
      expect(refreshToken).toBe(expectedToken);
    });
  });

  describe('verifyUser()', () => {
    it('should return true when user is valid', () => {
      expect(authService.verifyUser(savedUser.username, savedUser.password)).resolves.toBe(true);
    });

    it('should return false with invalid credentials', () => {
      expect(authService.verifyUser('admin5', 'admin2')).resolves.toBe(false);
    });

    it('should reject with invalid password', () => {
      expect(authService.verifyUser(savedUser.username, 'admin2')).resolves.toBe(false);
    });

    it('should reject with invalid username', () => {
      expect(authService.verifyUser('admin3', savedUser.password)).resolves.toBe(false);
    });

    it('should reject with empty credentials', () => {
      expect(authService.verifyUser('', '')).resolves.toBe(false);
    });

    it('should reject with empty username', () => {
      expect(authService.verifyUser('', savedUser.password)).resolves.toBe(false);
    });

    it('should reject with empty password', () => {
      expect(authService.verifyUser(savedUser.username, '')).resolves.toBe(false);
    });
  });

  describe('refreshAccessToken()', () => {
    it('should return new tokens when refresh token is valid', async () => {
      const accessToken = `Token_${Math.floor(Date.now() + Math.random())}`;

      tokenGenerator.verifyToken.mockResolvedValueOnce({ username: 'teszt' });
      tokenGenerator.signToken.mockResolvedValue(accessToken);

      const tokens = await authService.refreshTokens('refreshToken');

      expect(tokens.accessToken).toBe(accessToken);
      expect(tokens.refreshToken).toBe(accessToken);
    });

    it('should throw authentication error when refresh token is invalid', () => {
      tokenGenerator.verifyToken.mockRejectedValueOnce(new Error());

      expect(authService.refreshTokens('refreshToken')).rejects.toThrow(AuthenticationError);
    });

    it('should throw unexpected error when cannot sign token', () => {
      tokenGenerator.verifyToken.mockResolvedValueOnce({ username: 'teszt' });
      tokenGenerator.signToken.mockRejectedValueOnce(new TestError());

      expect(authService.refreshTokens('refreshToken')).rejects.toThrow(TestError);
    });
  });

  describe('registrate()', () => {
    it('dont registrate when user already exists', async () => {
      vi.spyOn(userDao, 'save');

      const success = await authService.registrate(savedUser);

      expect(success).toBe(false);
      expect(userDao.save).toHaveBeenCalledTimes(0);
    });

    it('should registrate when user doesnt exists', async () => {
      vi.spyOn(userDao, 'save');
      const user = FakeUserDao.createTestUser();

      expect(userDao.isUserSaved(user)).toBe(false);

      const success = await authService.registrate(user);

      expect(success).toBe(true);
      expect(userDao.save).toHaveBeenCalledOnce();
      expect(userDao.isUserSaved({ username: user.username, password: await pwdHasher.hash(user.password) })).toBe(true);
    });
  });
});
