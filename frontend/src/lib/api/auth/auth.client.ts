import { AuthClient, AuthTokens, LoginRequestBody, RefreshTokenBody } from "@/lib/api/auth/types";
import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";

export default class AuthClientImpl implements AuthClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async login(reqData: LoginRequestBody): Promise<AuthTokens> {
        const { data, error, response } = await this.api.POST('/auth/login', { body: reqData });
        if (!data) {
            throw new ApiResponseError(response, error);
        }
        return data;
    }

    public async refreshToken(reqData: RefreshTokenBody): Promise<AuthTokens> {
        const { data, error, response } = await this.api.POST('/auth/refresh', { body: reqData });
        if (!data) {
            throw new ApiResponseError(response, error);
        }
        return data;
    }
}
