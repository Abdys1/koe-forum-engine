import { CharacterEquipement, Sex } from "@src/components/character/types"

export interface CharacterRegistration {
    execute: (newCharacterDto: CreateCharacterInput) => Promise<CreateCharacterOutput>
}

export interface CreateCharacterInput {
    owner: { id: number, username: string },
    name: string,
    sex: Sex,
    race: string,
    equipement: CharacterEquipement,
    imageUrl: string
};

export interface CreateCharacterOutput {
    status: CreateCharacterStatus
}

export enum CreateCharacterStatus {
    CREATED = 'CHARACTER_CREATED',
    ALREADY_EXISTS = 'CHARACTER_ALREADY_EXISTS'
}