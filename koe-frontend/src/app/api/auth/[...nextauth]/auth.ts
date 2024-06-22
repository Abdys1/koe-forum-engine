import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { authClient } from "@/lib/api/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { HttpResponse, HttpResponseError } from "@/lib/api/http/http";
import { TokenResponseBody } from "@/lib/api/auth/types";

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

          return {
            username: credentials.username,
            accessToken: resp.data.accessToken,
            refreshToken: resp.data.refreshToken
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
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        return {
          username: user.username,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Date.now() + ACCESS_TOKEN_MAX_AGE
        };
      } else if (Date.now() < token.expiresAt) {
        return token;
      } else {
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      session.user = { username: token.username, accessToken: token.accessToken };
      return session;
    },
  }
} satisfies NextAuthOptions;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token?.refreshToken) {
      throw new Error("Missing refresh token!");
    }

    const res: HttpResponse<TokenResponseBody> = await authClient.refreshToken({ refreshToken: token.refreshToken });
    return {
      ...token,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      expiresAt: Date.now() + ACCESS_TOKEN_MAX_AGE
    };
  } catch (error: unknown) {
    console.error(error instanceof HttpResponseError ? error.stack : error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
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