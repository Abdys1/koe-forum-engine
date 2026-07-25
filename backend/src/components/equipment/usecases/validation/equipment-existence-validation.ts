import { EquipmentRepository } from "@src/components/equipment/repositories/types";

import { EquipmentExistenceValidation } from "./types";

export default class EquipmentExistenceValidationImpl implements EquipmentExistenceValidation {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public execute = async (ids: number[]): Promise<boolean> => {
        // Ugyanaz a felszerelés több példányban is hozzárendelhető, tehát az id lista
        // ismétlődhet. A repository `IN (...)` lekérdezése minden felszerelést egyszer
        // ad vissza, ezért a találatok számát a DEDUPLIKÁLT bemenethez kell hasonlítani.
        const uniqueIds = [...new Set(ids)];
        const found = await this.equipmentRepository.findAllByIds(uniqueIds);
        return found.length === uniqueIds.length;
    };
}
