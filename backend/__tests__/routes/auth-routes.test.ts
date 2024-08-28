import supertest from 'supertest';
import {
  beforeAll, describe, it, expect, beforeEach,
} from 'vitest';

import app from '@src/app';
import { UserModel } from '@src/components/user/user.model';
import AuthClient from '@test/routes/auth-client';
import {
  createRandomUser,
  assertLogin,
  assertLoginInputInvalid,
  assertRegistrationInputInvalid,
  createUsernameValidationError,
  createPasswordValidationError
} from '@test/routes/auth-test-utils';
import logger from '@src/components/logger/logger';


describe('Authentication api', () => {
  let authClient: AuthClient;

  beforeAll(async () => {
    authClient = new AuthClient(supertest(app));
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('when try login after registrate then should return valid access token', async () => {
    const user = createRandomUser();
    await authClient.registrate(user);
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
    await authClient.registrate(user);
    const resp = await authClient.login({ username: user.username, password: 'too_bad_pwd' });

    expect(resp.status).toBe(401);
    expect(resp.body.accessToken).toBeFalsy();
  });

  it('when try login with empty fields then return validation error', async () => {
    const expectedUsernameError = createUsernameValidationError('');
    const expectedPasswordError = createPasswordValidationError('');

    await assertLoginInputInvalid(authClient, { username: '', password: '' }, [expectedUsernameError, expectedPasswordError]);
    await assertLoginInputInvalid(authClient, { username: 'teszt', password: '' }, [expectedPasswordError]);
    await assertLoginInputInvalid(authClient, { username: '', password: 'teszt_password' }, [expectedUsernameError]);
  });

  it('when try login with too short fields then return validation error', async () => {
    await assertLoginInputInvalid(authClient, { username: 'asd', password: 'asdfsgh' },
      [createUsernameValidationError('asd'), createPasswordValidationError('asdfsgh')]);
    await assertLoginInputInvalid(authClient, { username: 'teszt', password: 'asdfsgh' }, [createPasswordValidationError('asdfsgh')]);
    await assertLoginInputInvalid(authClient, { username: 'asd', password: 'teszt_password' }, [createUsernameValidationError('asd')]);
  });

  it('when try login with too long fields then return validation error', async () => {
    await assertLoginInputInvalid(authClient, { username: 'a'.repeat(256), password: 'a'.repeat(65) },
      [createUsernameValidationError('a'.repeat(256)), createPasswordValidationError('a'.repeat(65))]);
    await assertLoginInputInvalid(authClient, { username: 'teszt', password: 'a'.repeat(65) }, [createPasswordValidationError('a'.repeat(65))]);
    await assertLoginInputInvalid(authClient, { username: 'a'.repeat(256), password: 'teszt_password' }, [createUsernameValidationError('a'.repeat(256))]);
  });

  it('when try registrate twice then should return 409 status', async () => {
    const user = createRandomUser();
    let resp = await authClient.registrate(user);

    expect(resp.status).toBe(200);

    resp = await authClient.registrate(user);

    expect(resp.status).toBe(409);
  });

  it('when try registrate with empty fields then return validation error', async () => {
    const expectedUsernameError = createUsernameValidationError('');
    const expectedPasswordError = createPasswordValidationError('');

    await assertRegistrationInputInvalid(authClient, { username: '', password: '' }, [expectedUsernameError, expectedPasswordError]);
    await assertRegistrationInputInvalid(authClient, { username: 'teszt', password: '' }, [expectedPasswordError]);
    await assertRegistrationInputInvalid(authClient, { username: '', password: 'Teszt_password2' }, [expectedUsernameError]);
  });

  it('when try registrate with too short fields then return validation error', async () => {
    await assertRegistrationInputInvalid(authClient, { username: 'asd', password: 'Asdfsgh' },
      [createUsernameValidationError('asd'), createPasswordValidationError('Asdfsgh')]);
    await assertRegistrationInputInvalid(authClient, { username: 'teszt', password: 'Asdfsgh1' }, [createPasswordValidationError('Asdfsgh1')]);
    await assertRegistrationInputInvalid(authClient, { username: 'asd', password: 'Teszt_password3' }, [createUsernameValidationError('asd')]);
  });

  it('when try registrate with too long fields then return validation error', async () => {
    await assertRegistrationInputInvalid(authClient, { username: 'a'.repeat(256), password: 'Teszt_password3'.repeat(65) },
      [createUsernameValidationError('a'.repeat(256)), createPasswordValidationError('Teszt_password3'.repeat(65))]);
    await assertRegistrationInputInvalid(authClient, { username: 'teszt', password: 'Teszt_password3'.repeat(65) },
      [createPasswordValidationError('Teszt_password3'.repeat(65))]);
    await assertRegistrationInputInvalid(authClient, { username: 'a'.repeat(256), password: 'Teszt_password3' },
      [createUsernameValidationError('a'.repeat(256))]);
  });

  it('when try registrate with weak password then return validation error', async () => {
    await assertRegistrationInputInvalid(authClient, { username: 'teszt', password: 'weak_password' }, [createPasswordValidationError('weak_password')]);
    await assertRegistrationInputInvalid(authClient, { username: 'teszt', password: 'weakpassword2' }, [createPasswordValidationError('weakpassword2')]);
    await assertRegistrationInputInvalid(authClient, { username: 'teszt', password: 'Weakpassword' }, [createPasswordValidationError('Weakpassword')]);
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
