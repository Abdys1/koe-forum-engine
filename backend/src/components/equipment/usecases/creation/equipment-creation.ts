import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";
import { CreateEquipmentInput, CreateEquipmentOutput, EquipmentCreation, EquipmentCreationResult } from "@src/components/equipment/usecases/creation/types";
import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { SlotRepository } from "@src/components/slot/repositories/types";

export default class EquipmentCreationImpl implements EquipmentCreation {
    constructor(
        private readonly equipmentRepository: EquipmentRepository,
        private readonly equipmentTypeRepository: EquipmentTypeRepository,
        private readonly slotRepository: SlotRepository
    ) {}

    public execute = async (input: CreateEquipmentInput): Promise<CreateEquipmentOutput> => {
        const equipmentType = await this.equipmentTypeRepository.findById(input.typeId);
        if (!equipmentType) {
            return { status: EquipmentCreationResult.TYPE_NOT_EXISTS };
        }

        const slot = equipmentType.slotId ? await this.slotRepository.findById(equipmentType.slotId) : null;
        if (slot) {
            if (input.slotCost === undefined) {
                return { status: EquipmentCreationResult.SLOT_COST_REQUIRED };
            }
            if (input.slotCost > slot.maxCapacity) {
                return { status: EquipmentCreationResult.SLOT_COST_EXCEEDS_CAPACITY };
            }
        }

        const existingEquipment = await this.equipmentRepository.findByNameAndTypeId(input.name, input.typeId);
        if (existingEquipment) {
            return { status: EquipmentCreationResult.ALREADY_EXISTS };
        }

        const equipment = await this.equipmentRepository.create({
            name: input.name,
            typeId: input.typeId,
            description: input.description,
            slotCost: slot ? input.slotCost ?? null : null
        });
        return { status: EquipmentCreationResult.CREATED, equipment: toEquipmentDetails(equipment) };
    };
}
