import { HttpResponse } from "@/lib/api/http/http";

export type LoginRequestBody = {
    username: string,
    password: string
};

export type TokenResponseBody = {
    accessToken: string
};

export interface AuthClient {
    login: (reqData: LoginRequestBody) => Promise<HttpResponse<TokenResponseBody>>,
    refreshToken: () => Promise<HttpResponse<TokenResponseBody>>
};