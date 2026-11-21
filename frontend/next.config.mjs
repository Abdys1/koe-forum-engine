import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const imagesBaseUrl = process.env.IMAGES_BASE_URL ? new URL(process.env.IMAGES_BASE_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '6mb',
        },
    },
    images: {
        remotePatterns: imagesBaseUrl
            ? [{
                protocol: imagesBaseUrl.protocol.replace(':', ''),
                hostname: imagesBaseUrl.hostname,
                port: imagesBaseUrl.port,
                pathname: `${imagesBaseUrl.pathname.replace(/\/$/, '')}/**`,
            }]
            : [],
    },
};

export default withVanillaExtract(nextConfig);
