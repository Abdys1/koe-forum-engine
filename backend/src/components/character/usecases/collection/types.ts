import { Sex } from "@src/components/character/types";
import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";

export interface CharacterCollection {
    execute: (userId: number) => Promise<CharacterCollectionOutput>
}

export interface CharacterEquipmentDetails extends EquipmentCollectionDetails {
    assignmentId: number
}

export interface CharacterCollectionDetails {
    id?: number,
    name: string,
    sex: Sex,
    race: string,
    equipment: CharacterEquipmentDetails[],
    imageUrl: string
};

export type CharacterCollectionOutput = CharacterCollectionDetails[];
