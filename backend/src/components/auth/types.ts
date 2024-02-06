import { JwtPayload, Secret } from 'jsonwebtoken';

export interface AuthService {
    generateTokens: (username: string) => Promise<AuthTokens>;
    verifyUser: (username: string, password: string) => Promise<boolean>
    refreshAccessToken: (refreshToken: string) => Promise<string | undefined>;
    registrate: (user: { username: string, password: string }) => Promise<boolean>
}

export type AuthTokens = {
    accessToken: string | undefined;
    refreshToken: string | undefined;
};

export interface PasswordHasher {
    verify: (hashedPwd: string, rawPwd: string) => Promise<boolean>;
    hash: (password: string) => Promise<string>;
}

export type TokenVerifierFunc = (token: string, secretKey: Secret) => Promise<ForumJwtPayload>;

export interface ForumJwtPayload extends JwtPayload {
    username: string
}

export interface TokenGenerator {
    signToken: (payload: string | Buffer | object, secretKey: Secret, expiresIn: string | number | undefined) => Promise<string | undefined>;
    verifyToken: (token: string, secretKey: Secret) => Promise<ForumJwtPayload>;
}