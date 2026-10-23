import { SlotRepository } from "@src/components/slot/repositories/types";
import { toSlotDetails } from "@src/components/slot/usecases/collection/mapper";
import { CreateSlotInput, CreateSlotOutput, SlotCreation, SlotCreationResult } from "@src/components/slot/usecases/creation/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class SlotCreationImpl implements SlotCreation {
    private slotRepositories: RepositoryProvider<SlotRepository>;

    constructor(slotRepositories: RepositoryProvider<SlotRepository>) {
        this.slotRepositories = slotRepositories;
    }

    public execute = async (input: CreateSlotInput): Promise<CreateSlotOutput> => {
        const label = input.label.trim();

        const existingSlot = await this.slotRepositories.get().findByLabelIgnoreCase(label);
        if (existingSlot) {
            return { status: SlotCreationResult.ALREADY_EXISTS };
        }

        const slot = await this.slotRepositories.get().create({ label, maxCapacity: input.maxCapacity });
        return { status: SlotCreationResult.CREATED, slot: toSlotDetails(slot) };
    };
}
