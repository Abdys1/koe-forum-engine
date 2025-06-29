import app from "@src/app";
import { signToken } from "@src/components/auth/jwt-token-generator";
import config from "@src/config";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";

abstract class BaseClient {
    protected request: TestAgent;

    constructor() {
        this.request = supertest(app);
    }

    protected async getAuthorizationHeader(user: { username: string }) {
        const accessToken = await this.signToken(user.username);
        return { 'Authorization': `Bearer ${accessToken}` };
    }

    private async signToken(username: string): Promise<string> {
        return await signToken({ username }, config.auth.secrets.accessToken, '10m') || '';
    }
}

export default BaseClient;