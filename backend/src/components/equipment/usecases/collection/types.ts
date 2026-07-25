import { EquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/types";

export interface EquipmentCollection {
    execute: () => Promise<EquipmentCollectionOutput>;
}

export interface EquipmentCollectionDetails {
    id?: number;
    name: string;
    description: string;
    /** A beágyazott típus az `equipment-type` komponens válasz-DTO-ja, nem az entity-je. */
    type?: EquipmentTypeDetails;
}

export type EquipmentCollectionOutput = EquipmentCollectionDetails[];
