import { SlotRepository } from "@src/components/slot/repositories/types";
import { RemoveSlotInput, RemoveSlotOutput, SlotRemoval, SlotRemovalResult } from "@src/components/slot/usecases/removal/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class SlotRemovalImpl implements SlotRemoval {
    private slotRepositories: RepositoryProvider<SlotRepository>;

    constructor(slotRepositories: RepositoryProvider<SlotRepository>) {
        this.slotRepositories = slotRepositories;
    }

    public execute = async (input: RemoveSlotInput): Promise<RemoveSlotOutput> => {
        const currentSlot = await this.slotRepositories.get().findById(input.id);
        if (!currentSlot) {
            return { status: SlotRemovalResult.NOT_FOUND };
        }

        await this.slotRepositories.get().delete(input.id);
        return { status: SlotRemovalResult.DELETED };
    };
}
