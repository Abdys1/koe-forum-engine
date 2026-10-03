import { SlotRepository } from "@src/components/slot/repositories/types";
import { toSlotCollectionOutput } from "@src/components/slot/usecases/collection/mapper";
import { SlotCollection, SlotCollectionOutput } from "@src/components/slot/usecases/collection/types";

export default class SlotCollectionImpl implements SlotCollection {
    private slotRepository: SlotRepository;

    constructor(slotRepository: SlotRepository) {
        this.slotRepository = slotRepository;
    }

    public execute = async (): Promise<SlotCollectionOutput> => {
        const slots = await this.slotRepository.findAll();
        return toSlotCollectionOutput(slots);
    };
}
