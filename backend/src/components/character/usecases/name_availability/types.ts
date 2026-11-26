export interface CharacterNameAvailabilityUseCase {
    execute: (name: string) => Promise<CharacterNameAvailabilityResult>
}

export enum CharacterNameAvailabilityResult {
    AVAILABLE,
    TAKEN
}
