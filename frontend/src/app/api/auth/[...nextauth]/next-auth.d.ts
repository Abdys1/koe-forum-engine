import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        username: string
        accessToken: string
        refreshToken: string
        expiresAt: number,
        error?: 'RefreshAccessTokenError'
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            username: string
            accessToken: string
        },
        error?: 'RefreshAccessTokenError'
    }

    interface User {
        username: string
        accessToken: string
        refreshToken: string
    }
}