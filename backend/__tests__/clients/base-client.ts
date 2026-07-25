import app from "@src/app";
import { signToken } from "@src/components/auth/jwt-token-generator";
import config from "@src/config";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
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

    /**
     * Olyan végpontokhoz, ahol a hívó személye lényegtelen, csak a bejelentkezés
     * kell. Minden hívás új felhasználót ír a DB-be.
     */
    protected async getAuthorizationHeaderForRandomUser() {
        const { username } = await saveTestUserToDb();
        return this.getAuthorizationHeader({ username });
    }

    private async signToken(username: string): Promise<string> {
        return await signToken({ username }, config.auth.secrets.accessToken, '10m') || '';
    }
}

export default BaseClient;