import argon2 from 'argon2';
import mongoose from 'mongoose';
import supertest, { Response } from 'supertest';
import {
  beforeAll, describe, it, expect, afterAll, beforeEach,
} from 'vitest';
import TestAgent from 'supertest/lib/agent';

import app from '@src/app';
import { verifyToken } from '@src/components/auth/jwt-token-generator.js';
import logger from '@src/components/logger/logger';
import UserModel from '@src/components/user/user.model';
import config from '@src/config';

import { generateUsername, generatePassword } from '@test/utils/test-data-generator';
import assertValidations from '@test/utils/validation-assert';

describe('Authentication api', () => {
  const BASE_URL = '/api/auth';

  let request: TestAgent;
  let testUser: { username: string, password: string };

  function createRandomUser() {
    return { username: generateUsername(), password: generatePassword() };
  }

  async function registrate(user: { username: string, password: string }): Promise<Response> {
    return request.post(`${BASE_URL}/registrate`)
      .send({ username: user.username, password: user.password })
      .set('Accept', 'application/json');
  }

  async function login(user: { username: string, password: string }): Promise<Response> {
    return request.post(`${BASE_URL}/login`)
      .send({ username: user.username, password: user.password })
      .set('Accept', 'application/json');
  }

  async function refresh(cookies: Array<string>): Promise<Response> {
    return request.post(`${BASE_URL}/refresh`).set('Cookie', cookies);
  }

  async function checkAccessToken(resp: Response, expectedUsername: string) {
    expect(resp.status).toBe(200);
    expect(resp.body.accessToken).toBeTruthy();
    const payload = await verifyToken(resp.body.accessToken, config.auth.secrets.accessToken);
    expect(payload.username).toBe(expectedUsername);
  }

  async function assertLoginInputInvalid(user: { username: string, password: string }, expectedErrors: any[]) {
    const resp = await login({ username: user.username, password: user.password });
    expect(resp.status).toBe(400);
    assertValidations(resp.body.errors, expectedErrors);
  }

  beforeAll(async () => {
    await mongoose.connect(config.database.url);
    request = supertest(app);
  });

  beforeEach(async () => {
    try {
      await UserModel.collection.drop();
    } catch (err) {
      logger.error(err);
    }
    testUser = createRandomUser();
    const user = new UserModel({
      username: testUser.username, password: await argon2.hash(testUser.password),
    });
    await user.save();
  });

  it('when try login after registrate then should return valid access token', async () => {
    const user = createRandomUser();
    await registrate(user);
    const resp = await login(user);

    await checkAccessToken(resp, user.username);
    expect(resp.headers['set-cookie'][0]).toMatch(/refreshToken=.*;*HttpOnly/);
  });

  it('when try login without registration then should return 401 status', async () => {
    const resp = await login(createRandomUser());

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('when try login with wrong password then should return 401 status', async () => {
    const user = createRandomUser();
    await registrate(user);
    const resp = await login({ username: user.username, password: 'bad_pwd' });

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('when try login with invalid fields then return 400 status', async () => {
    const expectedUsernameError = { location: 'body', path: 'username', type: 'field' };
    const expectedPasswordError = { location: 'body', path: 'password', type: 'field' };

    assertLoginInputInvalid({ username: '', password: '' }, [expectedUsernameError, expectedPasswordError]);
    assertLoginInputInvalid({ username: 'teszt', password: '' }, [expectedPasswordError]);
    assertLoginInputInvalid({ username: '', password: 'teszt' }, [expectedUsernameError]);
  });

  it('when already login then refresh endpoint should return new access token', async () => {
    const loginResp = await login(testUser);
    const resp = await refresh(loginResp.get('Set-Cookie'));

    await checkAccessToken(resp, testUser.username);
  });

  it('when try registrate twice then should return 409 status', async () => {
    const user = createRandomUser();

    let resp = await registrate(user);

    expect(resp.status).toBe(200);

    resp = await registrate(user);

    expect(resp.status).toBe(409);
  });

  it('when try refresh without token then should return 401 status', async () => {
    const resp = await refresh([]);

    expect(resp.status).toBe(401);
  });

  it('when try refresh with invalid token then should return 401 status', async () => {
    const resp = await refresh([
      'refreshToken=badToken; Max-Age=86400; Path=/; Expires=Tue, 22 Aug 2023 17:19:27 GMT; HttpOnly; Secure; SameSite=Strict',
    ]);

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  // TODO teszteljük, hogy levédett endpointokra nem tudunk bejelentkezni token nélkül
  /* it('when send request to private path without token then return 403 status', async () => {
    const resp = await request.post('/test-endpoint');
    expect(resp.status).toBe(403);
  });

  it('when send request to private path with invalid token then return 403 status', async () => {
    const resp = await request.post('/test-endpoint').set('authorization', 'Bearer token');
    expect(resp.status).toBe(403);
  }); */
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
