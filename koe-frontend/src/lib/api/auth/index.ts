import { http } from "@/lib/api/http/index";
import AuthClientImpl from "@/lib/api/auth/auth.client";
import { AuthClient } from "@/lib/api/auth/types";

const authClient: AuthClient = new AuthClientImpl(http);

export { authClient };