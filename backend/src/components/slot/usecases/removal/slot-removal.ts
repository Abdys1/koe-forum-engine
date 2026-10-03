import { SlotRepository } from "@src/components/slot/repositories/types";
import { RemoveSlotInput, RemoveSlotOutput, SlotRemoval, SlotRemovalResult } from "@src/components/slot/usecases/removal/types";

export default class SlotRemovalImpl implements SlotRemoval {
    private slotRepository: SlotRepository;

    constructor(slotRepository: SlotRepository) {
        this.slotRepository = slotRepository;
    }

    public execute = async (input: RemoveSlotInput): Promise<RemoveSlotOutput> => {
        const currentSlot = await this.slotRepository.findById(input.id);
        if (!currentSlot) {
            return { status: SlotRemovalResult.NOT_FOUND };
        }

        await this.slotRepository.delete(input.id);
        return { status: SlotRemovalResult.DELETED };
    };
}
