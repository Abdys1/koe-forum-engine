import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        username: string
        accessToken: string
        refreshToken: string
        expiresAt: number,
        activeCharacterId: number | null,
        error?: 'RefreshAccessTokenError'
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            username: string
            accessToken: string
            activeCharacterId: number | null
        },
        error?: 'RefreshAccessTokenError'
    }

    interface User {
        username: string
        accessToken: string
        refreshToken: string
        activeCharacterId: number | null
    }
}