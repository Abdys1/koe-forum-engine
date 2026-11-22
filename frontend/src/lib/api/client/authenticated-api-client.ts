import { getServerSession } from "next-auth";
import type { Middleware } from "openapi-fetch";

import { ApiClient, createApiClient } from "@/lib/api/client/api-client";
import { config } from "@/lib/auth/auth";

const bearerAuth: Middleware = {
    async onRequest({ request }) {
        const session = await getServerSession(config);
        if (session?.user?.accessToken) {
            request.headers.set('Authorization', `Bearer ${session.user.accessToken}`);
        }
        return request;
    }
};

export function createAuthenticatedApiClient(): ApiClient {
    const client = createApiClient();
    client.use(bearerAuth);
    return client;
}
