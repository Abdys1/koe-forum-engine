import BaseClient from '@test/clients/base-client';
import { Response } from "supertest";

class UserClient extends BaseClient {
    private static BASE_URL = '/api/users';

    public async getCurrentUser(username: string): Promise<Response> {
        return this.request.get(`${UserClient.BASE_URL}/me`).set(await this.getAuthorizationHeader({ username }));
    }

    public async setActiveCharacter(username: string, characterId: unknown): Promise<Response> {
        return this.request.put(`${UserClient.BASE_URL}/me/active-character`)
            .set(await this.getAuthorizationHeader({ username }))
            .send({ characterId });
    }
}

export default UserClient;
