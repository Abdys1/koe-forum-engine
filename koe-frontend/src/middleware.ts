import { withAuth } from "next-auth/middleware";

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

            return isPublicPath || isImagePath || isFaviconPath || !!token;
        }
    }
});