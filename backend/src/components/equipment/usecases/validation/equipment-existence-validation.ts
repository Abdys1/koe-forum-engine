import { EquipmentRepository } from "@src/components/equipment/repositories/types";

import { EquipmentExistenceValidation } from "./types";

export default class EquipmentExistenceValidationImpl implements EquipmentExistenceValidation {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public execute = async (ids: number[]): Promise<boolean> => {
        const found = await this.equipmentRepository.findAllByIds(ids);
        return found.length === ids.length;
    };
}
