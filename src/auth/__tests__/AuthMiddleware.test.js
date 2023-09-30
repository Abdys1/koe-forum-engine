/* eslint-disable dot-notation */
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import useAuthMiddleware from '#src/auth/AuthMiddleware.js';

describe('AuthMidlleware', () => {
  let verifyToken;
  let authMiddleware;

  function createRequestWithToken(token) {
    return { headers: { Authorization: token } };
  }

  function createResponse() {
    const res = { status: vi.fn(), send: vi.fn() };
    res.status.mockImplementation(() => res);
    return res;
  }

  beforeEach(() => {
    verifyToken = vi.fn();
    authMiddleware = useAuthMiddleware(verifyToken, ['/login']);
  });

  it('should be send forbidden status when token is not present', async () => {
    const req = { headers: {}, path: '/notPublic' };
    const res = { status: vi.fn(), send: vi.fn() };
    res.status.mockImplementation(() => res);

    await authMiddleware(req, res, null);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should be send forbidden status when token has not proper format', async () => {
    const req = createRequestWithToken('testToken');
    const res = createResponse();

    await authMiddleware(req, res, null);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should be send forbidden status when token is not valid', async () => {
    const req = createRequestWithToken('Bearer testToken');
    const res = createResponse();
    verifyToken.mockRejectedValue(new Error());

    await authMiddleware(req, res, null);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(verifyToken).toHaveBeenCalledWith('testToken');
  });

  it('should be call next when token is valid', async () => {
    const req = createRequestWithToken('Bearer testToken');
    const next = vi.fn();
    verifyToken.mockResolvedValue('testToken');

    await authMiddleware(req, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(verifyToken).toHaveBeenCalledWith('testToken');
  });

  it('should be call next when token is invalid but path is public', async () => {
    const req = { headers: {}, path: '/login' };
    const next = vi.fn();

    await authMiddleware(req, null, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
