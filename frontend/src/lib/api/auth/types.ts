import type { components, paths } from "@/lib/api/schema";

export type LoginRequestBody = paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];

export type RefreshTokenBody = paths["/auth/refresh"]["post"]["requestBody"]["content"]["application/json"];

export type AuthTokens = components["schemas"]["AuthTokens"];

export interface AuthClient {
    login: (reqData: LoginRequestBody) => Promise<AuthTokens>,
    refreshToken: (reqData: RefreshTokenBody) => Promise<AuthTokens>
};
