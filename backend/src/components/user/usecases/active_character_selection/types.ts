export interface ActiveCharacterSelectionUseCase {
    execute: (input: ActiveCharacterSelectionInput) => Promise<ActiveCharacterSelectionOutput>
}

export interface ActiveCharacterSelectionInput {
    userId: number,
    characterId: number
}

export interface ActiveCharacterSelectionOutput {
    status: ActiveCharacterSelectionResult
}

export enum ActiveCharacterSelectionResult {
    SELECTED,
    NOT_FOUND,
    NOT_OWNED
}
