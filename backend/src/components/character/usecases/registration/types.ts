import { CharacterEquipmentInputDto, Sex } from "@src/components/character/types"

export interface CharacterRegistration {
    execute: (newCharacterDto: CreateCharacterInput) => Promise<void>
}

export interface CreateCharacterInput {
    owner: { id: number, username: string },
    name: string,
    sex: Sex,
    race: string,
    equipment: CharacterEquipmentInputDto,
    imageUrl: string
};