import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { authClient } from "@/lib/api/auth";
import { AuthTokens } from "@/lib/api/auth/types";
import { ApiResponseError } from "@/lib/api/client/api-response.error";

const ACCESS_TOKEN_MAX_AGE = 60 * 10 * 1000;

export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const resp = await authClient.login({
            username: credentials.username,
            password: credentials.password
          });

          const currentUser = await authClient.getCurrentUser(resp.accessToken);

          return {
            username: credentials.username,
            accessToken: resp.accessToken,
            refreshToken: resp.refreshToken,
            activeCharacterId: currentUser.activeCharacterId
          };
        } catch (error: unknown) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async jwt({ token, user, trigger }): Promise<JWT> {
      if (user) {
        return {
          username: user.username,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Date.now() + ACCESS_TOKEN_MAX_AGE,
          activeCharacterId: user.activeCharacterId
        };
      } else if (Date.now() >= token.expiresAt) {
        return refreshAccessToken(token);
      } else if (trigger === "update") {
        return syncCurrentUser(token);
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      session.user = {
        username: token.username,
        accessToken: token.accessToken,
        activeCharacterId: token.activeCharacterId ?? null
      };
      return session;
    },
  }
} satisfies NextAuthOptions;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token?.refreshToken) {
      throw new Error("Missing refresh token!");
    }

    const res: AuthTokens = await authClient.refreshToken({ refreshToken: token.refreshToken });
    return syncCurrentUser({
      ...token,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      expiresAt: Date.now() + ACCESS_TOKEN_MAX_AGE
    });
  } catch (error: unknown) {
    console.error(error instanceof ApiResponseError ? error.stack : error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function syncCurrentUser(token: JWT): Promise<JWT> {
  try {
    const currentUser = await authClient.getCurrentUser(token.accessToken);
    return { ...token, activeCharacterId: currentUser.activeCharacterId };
  } catch (error: unknown) {
    console.error(error instanceof ApiResponseError ? error.stack : error);
    return token;
  }
}

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session | null> {
  return getServerSession(...args, config);
}