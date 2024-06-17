import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        username: string
        accessToken: string
        refreshToken: string
        expiresAt: number
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            username: string
            accessToken: string
        }
    }

    interface User {
        username: string
        accessToken: string
        refreshToken: string
    }
}