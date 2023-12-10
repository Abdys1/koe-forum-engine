import {
  beforeAll, describe, it, expect,
} from 'vitest';
import supertest from 'supertest';
import db from '#src/db/index.js';
import app from '#src/App.js';
import { verifyToken } from '#src/components/auth/JwtTokenGenerator.js';
import argon2 from 'argon2';
import migrateTestDatabase from '#src/__tests__/test-utils/migrations.js';
import config from '#src/Config.js';

const BASE_URL = '/api/auth';
const LOGIN_URL = `${BASE_URL}/login`;
const REFRESH_URL = `${BASE_URL}/refresh`;
const REGISTRATION_URL = `${BASE_URL}/registrate`;

async function checkAccessToken(resp, expectedUsername) {
  expect(resp.status).toBe(200);
  expect(resp.body.accessToken).toBeTruthy();
  const payload = await verifyToken(resp.body.accessToken, config.auth.secrets.accessToken);
  expect(payload.username).toBe(expectedUsername);
}

describe('Authentication routes', () => {
  let request;

  beforeAll(async () => {
    await migrateTestDatabase();
    await db('forum_user').insert({ username: 'admin', password: await argon2.hash('alma') });
    request = supertest(app);
  });

  describe('POST /api/auth/login', () => {
    it('should return tokens with valid credentials', async () => {
      const username = 'admin';
      const resp = await request.post(LOGIN_URL)
        .send({ username, password: 'alma' })
        .set('Accept', 'application/json');

      expect(resp.headers['set-cookie'][0]).toMatch(/refreshToken=.*;*HttpOnly/);
      await checkAccessToken(resp, username);
    });

    it('should return 401 with wrong credentials', async () => {
      const resp = await request.post(LOGIN_URL)
        .send({ username: 'admin', password: 'bad_pwd' })
        .set('Accept', 'application/json');

      expect(resp.status).toBe(401);
      expect(resp.body.accessToken).toBeFalsy();
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should return access token when has valid refresh token', async () => {
      const username = 'admin';
      const loginResp = await request.post(LOGIN_URL).send({ username, password: 'alma' });
      const refreshTokenCookie = loginResp.headers['set-cookie'];

      const resp = await request.post(REFRESH_URL).set('Cookie', refreshTokenCookie);
      await checkAccessToken(resp, username);
    });

    it('should return 401 status when has not refresh token', async () => {
      const resp = await request.post(REFRESH_URL);
      expect(resp.status).toBe(401);
    });

    it('should return 401 status when refresh token is invalid', async () => {
      const resp = await request.post(REFRESH_URL).set('Cookie', [
        'refreshToken=badToken; Max-Age=86400; Path=/; Expires=Tue, 22 Aug 2023 17:19:27 GMT; HttpOnly; Secure; SameSite=Strict',
      ]);
      expect(resp.status).toBe(401);
      expect(resp.body.accessToken).toBeFalsy();
    });
  });

  describe('POST /api/auth/registrate', () => {
    it('should return 200 status when user has not registered yet', async () => {
      const resp = await request.post(REGISTRATION_URL)
        .send({
          username: 'test',
          email: 'test@test.hu',
          password: 'alma',
        })
        .set('Accept', 'application/json');

      expect(resp.status).toBe(200);
    });

    it('should return 409 status when user has already registered', async () => {
      const resp = await request.post(REGISTRATION_URL)
        .send({
          username: 'admin',
          email: 'test@test.hu',
          password: 'alma',
        })
        .set('Accept', 'application/json');

      expect(resp.status).toBe(409);
    });
  });
});
