import { JWT } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

const PUBLIC_PATHS: string[] = [
    '/',
    '/auth/login',
    '/character/create'
];

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            const { pathname } = req.nextUrl;
            const isPublicPath = PUBLIC_PATHS.includes(pathname);
            const isImagePath = pathname.startsWith('/image');
            const isFaviconPath = pathname.startsWith('favicon.ico');
            const isSignIn = !!token && token.error !== 'RefreshAccessTokenError';

            return isPublicPath || isImagePath || isFaviconPath || isSignIn;
        }
    }
});