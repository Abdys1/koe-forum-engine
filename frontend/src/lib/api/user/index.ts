import { createAuthenticatedApiClient } from "@/lib/api/client/authenticated-api-client";
import { UserClient } from "@/lib/api/user/types";
import UserClientImpl from "@/lib/api/user/user.client";

const userClient: UserClient = new UserClientImpl(createAuthenticatedApiClient());

export { userClient };
