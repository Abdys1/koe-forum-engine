import { EquipmentRepository } from "@src/components/equipment/repositories/types";

import { EquipmentValidationService } from "./equipment-validation.service";

export default class EquipmentValidationServiceImpl implements EquipmentValidationService {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public allExist = async (ids: number[]): Promise<boolean> => {
        const found = await this.equipmentRepository.findAllByIds(ids);
        return found.length === ids.length;
    };
}
