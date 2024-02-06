import mongoose from 'mongoose';
import supertest from 'supertest';
import {
  beforeAll, describe, it, expect, afterAll, beforeEach,
} from 'vitest';

import app from '@src/app';
import logger from '@src/components/logger/logger';
import UserModel from '@src/components/user/user.model';
import config from '@src/config';
import AuthClient from '@test/components/auth/auth-client';
import { createRandomUser, assertAccessToken, assertLoginInputInvalid } from '@test/components/auth/auth-test-utils';


describe('Authentication api', () => {
  let authClient: AuthClient;

  beforeAll(async () => {
    await mongoose.connect(config.database.url);
    authClient = new AuthClient(supertest(app));
  });

  beforeEach(async () => {
    try {
      await UserModel.collection.drop();
    } catch (err) {
      logger.error(err);
    }
  });

  it('when try login after registrate then should return valid access token', async () => {
    const user = createRandomUser();
    await authClient.registrate(user);
    const resp = await authClient.login(user);

    await assertAccessToken(resp, user.username);
    expect(resp.headers['set-cookie'][0]).toMatch(/refreshToken=.*;*HttpOnly/);
  });

  it('when try login without registration then should return 401 status', async () => {
    const resp = await authClient.login(createRandomUser());

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('when try login with wrong password then should return 401 status', async () => {
    const user = createRandomUser();
    await authClient.registrate(user);
    const resp = await authClient.login({ username: user.username, password: 'bad_pwd' });

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('when try login with invalid fields then return 400 status', async () => {
    const expectedUsernameError = { location: 'body', path: 'username', type: 'field' };
    const expectedPasswordError = { location: 'body', path: 'password', type: 'field' };

    assertLoginInputInvalid(authClient, { username: '', password: '' }, [expectedUsernameError, expectedPasswordError]);
    assertLoginInputInvalid(authClient, { username: 'teszt', password: '' }, [expectedPasswordError]);
    assertLoginInputInvalid(authClient, { username: '', password: 'teszt' }, [expectedUsernameError]);
  });

  it('when already login then refresh endpoint should return new access token', async () => {
    const user = createRandomUser();
    await authClient.registrate(user);
    const loginResp = await authClient.login(user);
    const resp = await authClient.refresh(loginResp.get('Set-Cookie'));

    await assertAccessToken(resp, user.username);
  });

  it('when try registrate twice then should return 409 status', async () => {
    const user = createRandomUser();
    let resp = await authClient.registrate(user);

    expect(resp.status).toBe(200);

    resp = await authClient.registrate(user);

    expect(resp.status).toBe(409);
  });

  it('when try refresh without token then should return 401 status', async () => {
    const resp = await authClient.refresh([]);
    expect(resp.status).toBe(401);
  });

  it('when try refresh with invalid token then should return 401 status', async () => {
    const resp = await authClient.refresh([
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
