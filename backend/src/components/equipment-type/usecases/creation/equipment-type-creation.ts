import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";
import { CreateEquipmentTypeInput, CreateEquipmentTypeOutput, EquipmentTypeCreation, EquipmentTypeCreationResult } from "@src/components/equipment-type/usecases/creation/types";
import { SlotRepository } from "@src/components/slot/repositories/types";

export default class EquipmentTypeCreationImpl implements EquipmentTypeCreation {
    private equipmentTypeRepository: EquipmentTypeRepository;
    private slotRepository: SlotRepository;

    constructor(equipmentTypeRepository: EquipmentTypeRepository, slotRepository: SlotRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
        this.slotRepository = slotRepository;
    }

    public execute = async (input: CreateEquipmentTypeInput): Promise<CreateEquipmentTypeOutput> => {
        const label = input.label.trim();

        const existingType = await this.equipmentTypeRepository.findByLabelIgnoreCase(label);
        if (existingType) {
            return { status: EquipmentTypeCreationResult.ALREADY_EXISTS };
        }

        if (input.slotId !== undefined) {
            const slot = await this.slotRepository.findById(input.slotId);
            if (!slot) {
                return { status: EquipmentTypeCreationResult.SLOT_NOT_EXISTS };
            }
        }

        const equipmentType = await this.equipmentTypeRepository.create({ label, slotId: input.slotId ?? null });
        return { status: EquipmentTypeCreationResult.CREATED, equipmentType: toEquipmentTypeDetails(equipmentType) };
    };
}
