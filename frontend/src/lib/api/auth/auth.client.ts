import { AuthClient, LoginRequestBody, RefreshTokenBody, TokenResponseBody } from "@/lib/api/auth/types";
import { HttpClient, HttpResponse } from "@/lib/api/http/http";

export default class AuthClientImpl implements AuthClient {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public async login(reqData: LoginRequestBody): Promise<HttpResponse<TokenResponseBody>> {
        return this.http.post('/auth/login', reqData);
    }

    public async refreshToken(reqData: RefreshTokenBody): Promise<HttpResponse<TokenResponseBody>> {
        return this.http.post('/auth/refresh', reqData);
    }
}