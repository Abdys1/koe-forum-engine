import {
  beforeAll, describe, it, expect, afterAll,
} from 'vitest';
import supertest from 'supertest';
import db from '../../db/index.js';
import app from '../../App.js';
import { verifyToken } from '../../auth/TokenGenerator.js';

async function checkAccessToken(resp, expectedUsername) {
  expect(resp.status).toBe(200);
  expect(resp.body.accessToken).toBeTruthy();
  const payload = await verifyToken(resp.body.accessToken, process.env.ACCESS_TOKEN_SECRET);
  expect(payload.username).toBe(expectedUsername);
}

describe('POST /api/auth/login', () => {
  const url = '/api/auth/login';

  let request;

  beforeAll(async () => {
    request = supertest(app);
    await db.migrate.latest();
    await db.seed.run();
  });

  it('should return tokens with valid credentials', async () => {
    const username = 'admin';
    const resp = await request.post(url)
      .send({ username, password: 'alma' })
      .set('Accept', 'application/json');

    expect(resp.headers['set-cookie'][0]).toMatch(/refreshToken=.*;*HttpOnly/);
    await checkAccessToken(resp, username);
  });

  it('should return 401 with wrong credentials', async () => {
    const resp = await request.post(url)
      .send({ username: 'admin', password: 'bad_pwd' })
      .set('Accept', 'application/json');

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  afterAll(async () => {
    await db.migrate.down();
  });
});

describe('POST /api/auth/refresh', () => {
  const url = '/api/auth/refresh';

  let request;

  beforeAll(async () => {
    request = supertest(app);
    await db.migrate.latest();
    await db.seed.run();
  });

  it('should return 401 status when has not refresh token', async () => {
    const resp = await request.post(url);
    expect(resp.status).toBe(401);
  });

  it('should return 401 status when refresh token is invalid', async () => {
    const resp = await request.post(url).set('Cookie', [
      'refreshToken=badToken; Max-Age=86400; Path=/; Expires=Tue, 22 Aug 2023 17:19:27 GMT; HttpOnly; Secure; SameSite=Strict',
    ]);
    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('should return access token when has valid refresh token', async () => {
    const username = 'admin';
    const loginResp = await request.post('/api/auth/login').send({ username, password: 'alma' });
    const refreshTokenCookie = loginResp.headers['set-cookie'];

    const resp = await request.post(url).set('Cookie', refreshTokenCookie);
    await checkAccessToken(resp, username);
  });

  afterAll(async () => {
    await db.migrate.down();
  });
});
