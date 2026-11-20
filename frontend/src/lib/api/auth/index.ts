import AuthClientImpl from "@/lib/api/auth/auth.client";
import { AuthClient } from "@/lib/api/auth/types";
import { createApiClient } from "@/lib/api/client/api-client";

const authClient: AuthClient = new AuthClientImpl(createApiClient());

export { authClient };
