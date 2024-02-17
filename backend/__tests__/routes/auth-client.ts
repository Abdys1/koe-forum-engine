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

    public async refresh(cookies: Array<string>): Promise<Response> {
        return this.request.post(`${AuthClient.BASE_URL}/refresh`).set('Cookie', cookies);
    }
}

export default AuthClient;