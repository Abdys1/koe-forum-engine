import { HttpResponse } from "@/lib/api/http/http";

export type LoginRequestBody = {
    username: string,
    password: string
};

export type RefreshTokenBody = {
    refreshToken: string
};

export type TokenResponseBody = {
    accessToken: string,
    refreshToken: string
};

export interface AuthClient {
    login: (reqData: LoginRequestBody) => Promise<HttpResponse<TokenResponseBody>>,
    refreshToken: (reqData: RefreshTokenBody) => Promise<HttpResponse<TokenResponseBody>>
};