import { SlotRepository } from "@src/components/slot/repositories/types";
import { toSlotDetails } from "@src/components/slot/usecases/collection/mapper";
import { CreateSlotInput, CreateSlotOutput, SlotCreation, SlotCreationResult } from "@src/components/slot/usecases/creation/types";

export default class SlotCreationImpl implements SlotCreation {
    private slotRepository: SlotRepository;

    constructor(slotRepository: SlotRepository) {
        this.slotRepository = slotRepository;
    }

    public execute = async (input: CreateSlotInput): Promise<CreateSlotOutput> => {
        const label = input.label.trim();

        const existingSlot = await this.slotRepository.findByLabelIgnoreCase(label);
        if (existingSlot) {
            return { status: SlotCreationResult.ALREADY_EXISTS };
        }

        const slot = await this.slotRepository.create({ label, maxCapacity: input.maxCapacity });
        return { status: SlotCreationResult.CREATED, slot: toSlotDetails(slot) };
    };
}
