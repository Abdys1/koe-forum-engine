export interface EquipmentTypeCollection {
    execute: () => Promise<EquipmentTypeCollectionOutput>
}

/**
 * A típus API-ra kerülő alakja. Szándékosan külön a `EquipmentTypeEntity`-től: a
 * válasz-szerződés nem változhat attól, hogy az entity új mezőt kap. Ezt a DTO-t
 * használja az `equipment` komponens is a beágyazott `type` mezőhöz, hogy a
 * kétféle válaszban ugyanaz az alak menjen ki.
 */
export interface EquipmentTypeDetails {
    id?: number;
    label: string;
}

export type EquipmentTypeCollectionOutput = EquipmentTypeDetails[];
