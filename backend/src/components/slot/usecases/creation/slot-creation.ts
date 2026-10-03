import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { SlotRepository } from "@src/components/slot/repositories/types";
import { toSlotDetails } from "@src/components/slot/usecases/collection/mapper";
import { CreateSlotInput, CreateSlotOutput, SlotCreation, SlotCreationResult } from "@src/components/slot/usecases/creation/types";

export default class SlotCreationImpl implements SlotCreation {
    private slotRepository: SlotRepository;
    private equipmentTypeRepository: EquipmentTypeRepository;

    constructor(slotRepository: SlotRepository, equipmentTypeRepository: EquipmentTypeRepository) {
        this.slotRepository = slotRepository;
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    public execute = async (input: CreateSlotInput): Promise<CreateSlotOutput> => {
        const equipmentType = await this.equipmentTypeRepository.findById(input.equipmentTypeId);
        if (!equipmentType) {
            return { status: SlotCreationResult.EQUIPMENT_TYPE_NOT_EXISTS };
        }

        const existingSlot = await this.slotRepository.findByEquipmentTypeId(input.equipmentTypeId);
        if (existingSlot) {
            return { status: SlotCreationResult.ALREADY_EXISTS };
        }

        const slot = await this.slotRepository.create({
            equipmentTypeId: input.equipmentTypeId,
            maxCapacity: input.maxCapacity
        });
        return { status: SlotCreationResult.CREATED, slot: toSlotDetails(slot) };
    };
}
