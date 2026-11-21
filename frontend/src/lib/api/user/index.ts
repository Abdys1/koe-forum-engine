import { createAuthenticatedApiClient } from "@/lib/api/client/authenticated-api-client";
import UserClientImpl from "@/lib/api/user/user.client";
import { UserClient } from "@/lib/api/user/types";

const userClient: UserClient = new UserClientImpl(createAuthenticatedApiClient());

export { userClient };
