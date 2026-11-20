import type { Middleware } from "openapi-fetch";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/auth";
import { ApiClient, createApiClient } from "@/lib/api/client/api-client";

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
