/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateUsername, generatePassword } from '@test/utils/test-data-generator';
import { Response } from 'supertest';
import { verifyToken } from '@src/components/auth/jwt-token-generator';
import config from '@src/config';
import AuthClient from '@test/routes/auth-client';

export function createRandomUser(): { username: string, password: string } {
    return { username: generateUsername(), password: generatePassword() };
}

export async function assertLogin(resp: Response, expectedUsername: string): Promise<void> {
    expect(resp.status).toBe(200);
    expect(resp.body.accessToken).toBeTruthy();
    const accessTokenPayload = await verifyToken(resp.body.accessToken, config.auth.secrets.accessToken);
    expect(accessTokenPayload.username).toBe(expectedUsername);
    const refreshTokenPayload = await verifyToken(resp.body.refreshToken, config.auth.secrets.refreshToken);
    expect(refreshTokenPayload.username).toBe(expectedUsername);
}

export function createUsernameValidationError(value: string, msg = 'Invalid value') {
    return createFieldValidationError(value, "username", msg);
}

export function createPasswordValidationError(value: string, msg = 'Invalid value') {
    return createFieldValidationError(value, "password", msg);
}

//TODO kiemelni egy egységes util-ba
export function createFieldValidationError(value: string, path: string, msg = 'Invalid value') {
    return { value, path, msg, location: 'body', type: 'field' }
}

export async function assertLoginInputInvalid(client: AuthClient, user: { username: string, password: string }, expectedErrors: any[]): Promise<void> {
    const resp = await client.login({ username: user.username, password: user.password });
    expect(resp.status).toBe(400);
    expect(resp.body.errors).toStrictEqual(expectedErrors);
}

export async function assertRegistrationInputInvalid(client: AuthClient, user: { username: string, password: string }, expectedErrors: any[]): Promise<void> {
    const resp = await client.registrate({ username: user.username, password: user.password });
    expect(resp.status).toBe(400);
    expect(resp.body.errors).toStrictEqual(expectedErrors);
}