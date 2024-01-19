export type Config = {
    database: { url: string };
    auth: { secrets: { accessToken: string, refreshToken: string } }
}