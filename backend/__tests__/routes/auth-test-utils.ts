/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateUsername, generatePassword } from '@test/utils/test-data-generator';
import assertValidations from '@test/utils/validation-assert';
import { Response } from 'supertest';
import { verifyToken } from '@src/components/auth/jwt-token-generator';
import config from '@src/config';
import AuthClient from '@test/routes/auth-client';

export function createRandomUser(): { username: string, password: string } {
    return { username: generateUsername(), password: generatePassword() };
}  

export async function assertAccessToken(resp: Response, expectedUsername: string): Promise<void> {
    expect(resp.status).toBe(200);
    expect(resp.body.accessToken).toBeTruthy();
    const payload = await verifyToken(resp.body.accessToken, config.auth.secrets.accessToken);
    expect(payload.username).toBe(expectedUsername);
}

export async function assertLoginInputInvalid(client: AuthClient, user: { username: string, password: string }, expectedErrors: any[]): Promise<void> {
    const resp = await client.login({ username: user.username, password: user.password });
    expect(resp.status).toBe(400);
    assertValidations(resp.body.errors, expectedErrors);
}

export async function assertRegistrationInputInvalid(client: AuthClient, user: { username: string, password: string }, expectedErrors: any[]): Promise<void> {
    const resp = await client.registrate({ username: user.username, password: user.password });
    expect(resp.status).toBe(400);
    assertValidations(resp.body.errors, expectedErrors);
}