import { CharacterEquipment, Sex } from "@src/components/character/types";

export interface CharacterCollection {
    execute: (userId: number) => Promise<CharacterCollectionOutput>
}

export interface CharacterCollectionDetails {
    id?: number,
    name: string,
    sex: Sex,
    race: string,
    equipment: CharacterEquipment,
    imageUrl: string
};

export type CharacterCollectionOutput = CharacterCollectionDetails[];