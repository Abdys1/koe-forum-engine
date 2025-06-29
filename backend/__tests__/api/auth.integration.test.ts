import { verifyToken } from '@src/components/auth/jwt-token-generator';
import config from '@src/config';
import AuthClient from '@test/clients/auth-client';
import { createRandomUser } from '@test/utils/test-data-generator';
import { assertFieldError } from '@test/utils/validator-test-helper';
import { Response } from 'supertest';
import {
  beforeAll, describe, expect, it,
} from 'vitest';

describe('Authentication api', () => {
  let authClient: AuthClient;

  beforeAll(async () => {
    authClient = new AuthClient();
  });

  it('when try login after registrate then should return valid access token', async () => {
    const user = createRandomUser();
    const regResp = await authClient.registrate(user);

    expect(regResp.status).toBe(200);

    const resp = await authClient.login(user);

    await assertLogin(resp, user.username);
  });

  it('when try login without registration then should return 401 status', async () => {
    const resp = await authClient.login(createRandomUser());

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
    expect(resp.body.refreshToken).toBeFalsy();
  });

  it('when try login with wrong password then should return 401 status', async () => {
    const user = createRandomUser();
    let resp = await authClient.registrate(user);

    expect(resp.status).toBe(200);

    resp = await authClient.login({ username: user.username, password: 'too_bad_pwd' });

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('when try login with empty fields then return validation error', async () => {
    let resp = await authClient.registrate({ username: '', password: '' });
    assertFieldError(resp, 'username', ['Invalid value']);
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: '' });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: '', password: 'Teszt_password2' });
    assertFieldError(resp, 'username', ['Invalid value']);
  });

  it('when try login with too short fields then return validation error', async () => {
    let resp = await authClient.registrate({ username: 'asd', password: 'Asdfsgh' });
    assertFieldError(resp, 'username', ['Invalid value']);
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: 'Asdfsgh' });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'asd', password: 'teszt_password' });
    assertFieldError(resp, 'username', ['Invalid value']);
  });

  it('when try login with too long fields then return validation error', async () => {
    let resp = await authClient.registrate({ username: 'a'.repeat(256), password: 'a'.repeat(65) });
    assertFieldError(resp, 'username', ['Invalid value']);
    assertFieldError(resp, 'password', ['Invalid value', 'Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: 'a'.repeat(65) });
    assertFieldError(resp, 'password', ['Invalid value', 'Invalid value']);

    resp = await authClient.registrate({ username: 'a'.repeat(256), password: 'teszt_password' });
    assertFieldError(resp, 'username', ['Invalid value']);
  });

  it('when try registrate twice then should return 409 status', async () => {
    const user = createRandomUser();
    let resp = await authClient.registrate(user);

    expect(resp.status).toBe(200);

    resp = await authClient.registrate(user);

    expect(resp.status).toBe(409);
  });

  it('when try registrate with empty fields then return validation error', async () => {
    let resp = await authClient.registrate({ username: '', password: '' });
    assertFieldError(resp, 'username', ['Invalid value']);
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: '' });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: '', password: 'Teszt_password2' });
    assertFieldError(resp, 'username', ['Invalid value']);
  });

  it('when try registrate with too short fields then return validation error', async () => {
    let resp = await authClient.registrate({ username: 'asd', password: 'Asdfsgh' });
    assertFieldError(resp, 'username', ['Invalid value']);
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: 'Asdfsgh' });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'asd', password: 'Teszt_password3' });
    assertFieldError(resp, 'username', ['Invalid value']);
  });

  it('when try registrate with too long fields then return validation error', async () => {
    let resp = await authClient.registrate({ username: 'a'.repeat(256), password: 'Teszt_password3'.repeat(65) });
    assertFieldError(resp, 'username', ['Invalid value']);
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: 'Teszt_password3'.repeat(65) });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'a'.repeat(256), password: 'Teszt_password3' });
    assertFieldError(resp, 'username', ['Invalid value']);
  });

  it('when try registrate with weak password then return validation error', async () => {
    let resp = await authClient.registrate({ username: 'teszt', password: 'weak_password' });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: 'weakpassword2' });
    assertFieldError(resp, 'password', ['Invalid value']);

    resp = await authClient.registrate({ username: 'teszt', password: 'Weakpassword' });
    assertFieldError(resp, 'password', ['Invalid value']);
  });

  it('when already login then refresh endpoint should return new tokens', async () => {
    const user = createRandomUser();
    await authClient.registrate(user);
    const loginResp = await authClient.login(user);
    const resp = await authClient.refresh(loginResp.body.refreshToken);

    await assertLogin(resp, user.username);
  });

  it('when try refresh without token then should return 401 status', async () => {
    const resp = await authClient.refresh(null);
    expect(resp.status).toBe(401);
  });

  it('when try refresh with invalid token then should return 401 status', async () => {
    const resp = await authClient.refresh('invalid_token');

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
});

export async function assertLogin(resp: Response, expectedUsername: string): Promise<void> {
  expect(resp.status).toBe(200);
  expect(resp.body.accessToken).toBeTruthy();
  const accessTokenPayload = await verifyToken(resp.body.accessToken, config.auth.secrets.accessToken);
  expect(accessTokenPayload.username).toBe(expectedUsername);
  const refreshTokenPayload = await verifyToken(resp.body.refreshToken, config.auth.secrets.refreshToken);
  expect(refreshTokenPayload.username).toBe(expectedUsername);
}