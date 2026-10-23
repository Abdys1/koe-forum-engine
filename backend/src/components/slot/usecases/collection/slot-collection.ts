import { SlotRepository } from "@src/components/slot/repositories/types";
import { toSlotCollectionOutput } from "@src/components/slot/usecases/collection/mapper";
import { SlotCollection, SlotCollectionOutput } from "@src/components/slot/usecases/collection/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class SlotCollectionImpl implements SlotCollection {
    private slotRepositories: RepositoryProvider<SlotRepository>;

    constructor(slotRepositories: RepositoryProvider<SlotRepository>) {
        this.slotRepositories = slotRepositories;
    }

    public execute = async (): Promise<SlotCollectionOutput> => {
        const slots = await this.slotRepositories.get().findAll();
        return toSlotCollectionOutput(slots);
    };
}
