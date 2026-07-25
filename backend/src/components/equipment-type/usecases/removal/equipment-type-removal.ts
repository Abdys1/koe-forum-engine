import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { EquipmentTypeRemoval, EquipmentTypeRemovalResult, RemoveEquipmentTypeInput, RemoveEquipmentTypeOutput } from "@src/components/equipment-type/usecases/removal/types";

export default class EquipmentTypeRemovalImpl implements EquipmentTypeRemoval {
    private equipmentTypeRepository: EquipmentTypeRepository;

    constructor(equipmentTypeRepository: EquipmentTypeRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    public execute = async (input: RemoveEquipmentTypeInput): Promise<RemoveEquipmentTypeOutput> => {
        const currentType = await this.equipmentTypeRepository.findById(input.id);
        if (!currentType) {
            return { status: EquipmentTypeRemovalResult.NOT_FOUND };
        }

        const referencingEquipmentCount = await this.equipmentTypeRepository.countEquipmentByTypeId(input.id);
        if (referencingEquipmentCount > 0) {
            return { status: EquipmentTypeRemovalResult.IN_USE };
        }

        await this.equipmentTypeRepository.delete(input.id);
        return { status: EquipmentTypeRemovalResult.DELETED };
    };
}
