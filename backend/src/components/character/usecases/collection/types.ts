import { Sex } from "@src/components/character/types";
import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";

export interface CharacterCollection {
    execute: (userId: number) => Promise<CharacterCollectionOutput>
}

/**
 * Egy hozzárendelés a válaszban: az `equipment` komponens publikált válasz-alakja
 * plusz az `assignmentId`. Duplikáció esetén két elem `id`-ja azonos, ezért a
 * kliensnek az `assignmentId` a stabil, egyedi azonosító (listakulcs, későbbi
 * példány-szintű műveletek).
 */
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
