import {
  describe, it, expect, vi, beforeEach, Mock,
} from 'vitest';

import useAuthMiddleware from '@src/components/auth/auth.middleware';
import { AuthenticationMiddleware } from '@src/components/auth/types';
import { Request, Response } from 'express';

describe('AuthMidlleware', () => {
  let verifyToken: Mock;
  let authMiddleware: AuthenticationMiddleware;

  function createRequestWithToken(token: string): Partial<Request> {
    return { headers: { Authorization: token } };
  }

  function createResponse(): Partial<Response> {
    const res = { status: vi.fn(), send: vi.fn() };
    res.status.mockImplementation(() => res);
    return res;
  }

  async function runAuthMiddleware(token: string): Promise<Response> {
    const req = createRequestWithToken(token) as Request;
    const res = createResponse() as Response;
    const next = vi.fn();

    await authMiddleware(req, res, next);
    return res;
  }

  beforeEach(() => {
    verifyToken = vi.fn();
    authMiddleware = useAuthMiddleware(verifyToken, ['/login'], 'testSecret');
  });

  it('should be send forbidden status when token is not present', async () => {
    const req = { headers: {}, path: '/notPublic' } as Request;
    const res = createResponse() as Response;
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should be send forbidden status when token has not proper format', async () => {
    const res = await runAuthMiddleware('testToken');

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should be send forbidden status when token is not valid', async () => {
    verifyToken.mockRejectedValue(new Error());

    const res = await runAuthMiddleware('Bearer testToken');

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(verifyToken).toHaveBeenCalledWith('testToken', 'testSecret');
  });

  it('should be call next when token is valid', async () => {
    verifyToken.mockResolvedValue('testToken');
    const req = createRequestWithToken('Bearer testToken') as Request;
    const next = vi.fn();

    await authMiddleware(req, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(verifyToken).toHaveBeenCalledWith('testToken', 'testSecret');
  });

  it('should be call next when token is invalid but path is public', async () => {
    const req = { headers: {}, path: '/login' } as Request;
    const next = vi.fn();

    await authMiddleware(req, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
