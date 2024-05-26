import TestAgent from "supertest/lib/agent";
import { Response } from 'supertest';

class AuthClient {
    private static BASE_URL = '/api/auth';

    private request: TestAgent;

    constructor(request: TestAgent) {
        this.request = request;
    }

    public async registrate(user: { username: string, password: string }): Promise<Response> {
        return this.request.post(`${AuthClient.BASE_URL}/registrate`)
            .send({ username: user.username, password: user.password })
            .set('Accept', 'application/json');
    }

    public async login(user: { username: string, password: string }): Promise<Response> {
        return this.request.post(`${AuthClient.BASE_URL}/login`)
            .send({ username: user.username, password: user.password })
            .set('Accept', 'application/json');
    }

    public async refresh(refreshToken: string | null | undefined): Promise<Response> {
        return this.request.post(`${AuthClient.BASE_URL}/refresh`).send({ refreshToken });
    }
}

export default AuthClient;