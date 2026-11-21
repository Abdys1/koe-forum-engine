export interface CurrentUserUseCase {
    execute: (input: CurrentUserInput) => Promise<CurrentUserOutput>
}

export interface CurrentUserInput {
    userId: number
}

export interface CurrentUser {
    id: number,
    username: string,
    activeCharacterId: number | null
}

export interface CurrentUserOutput {
    status: CurrentUserResult,
    user?: CurrentUser
}

export enum CurrentUserResult {
    FOUND,
    NOT_FOUND
}
