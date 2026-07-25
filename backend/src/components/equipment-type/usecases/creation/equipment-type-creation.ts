import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";
import { CreateEquipmentTypeInput, CreateEquipmentTypeOutput, EquipmentTypeCreation, EquipmentTypeCreationResult } from "@src/components/equipment-type/usecases/creation/types";

export default class EquipmentTypeCreationImpl implements EquipmentTypeCreation {
    private equipmentTypeRepository: EquipmentTypeRepository;

    constructor(equipmentTypeRepository: EquipmentTypeRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    public execute = async (input: CreateEquipmentTypeInput): Promise<CreateEquipmentTypeOutput> => {
        const label = input.label.trim();

        const existingType = await this.equipmentTypeRepository.findByLabelIgnoreCase(label);
        if (existingType) {
            return { status: EquipmentTypeCreationResult.ALREADY_EXISTS };
        }

        const equipmentType = await this.equipmentTypeRepository.create({ label });
        return { status: EquipmentTypeCreationResult.CREATED, equipmentType: toEquipmentTypeDetails(equipmentType) };
    };
}
