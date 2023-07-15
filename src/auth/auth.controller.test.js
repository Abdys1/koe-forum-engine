import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import AuthenticationError from './authentication.error';
import AuthController from './auth.controller.js';

describe('Auth controller login', () => {
  const req = { body: { username: 'john', password: 'changeme' } };
  const expectedTokens = { accessToken: 'access-token', refreshToken: 'refresh-token' };

  let fakeAuthService;
  let authController;
  let res;
  let next;

  beforeEach(() => {
    fakeAuthService = { login: vi.fn() };
    authController = new AuthController(fakeAuthService);
    res = { send: vi.fn(), cookie: vi.fn() };
    next = vi.fn();
  });

  it('should return 200 with valid credentials', async () => {
    fakeAuthService.login.mockReturnValueOnce(Promise.resolve(expectedTokens));

    await authController.login(req, res, next);
    expect(res.send).toHaveBeenCalledWith(200, { accessToken: 'access-token' });
  });

  it('should set refreshToken cookie with valid credentials', async () => {
    fakeAuthService.login.mockReturnValueOnce(Promise.resolve(expectedTokens));

    await authController.login(req, res, next);
    expect(res.cookie).toHaveBeenCalledWith('refresh-token', 'refresh-token', {
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  });

  it('should return 401 with invalid credentials', async () => {
    fakeAuthService.login.mockReturnValueOnce(Promise.reject(new AuthenticationError('Wrong credentials')));

    await authController.login(req, res, next);
    expect(res.send).toHaveBeenCalledWith(401);
  });

  it('should call next with unknown error', async () => {
    const err = new Error('Unknown error');
    fakeAuthService.login.mockReturnValueOnce(Promise.reject(err));

    await authController.login(req, res, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});
