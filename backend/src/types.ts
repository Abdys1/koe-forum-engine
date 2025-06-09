export interface Config {
    auth: { secrets: { accessToken: string, refreshToken: string } }
}

export interface Repository<T> {
    create: (entity: T) => Promise<void>
}