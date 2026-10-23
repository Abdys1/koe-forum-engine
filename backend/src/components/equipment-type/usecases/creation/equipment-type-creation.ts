import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";
import { CreateEquipmentTypeInput, CreateEquipmentTypeOutput, EquipmentTypeCreation, EquipmentTypeCreationResult } from "@src/components/equipment-type/usecases/creation/types";
import { SlotRepository } from "@src/components/slot/repositories/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentTypeCreationImpl implements EquipmentTypeCreation {
    private equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>;
    private slotRepositories: RepositoryProvider<SlotRepository>;

    constructor(equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>, slotRepositories: RepositoryProvider<SlotRepository>) {
        this.equipmentTypeRepositories = equipmentTypeRepositories;
        this.slotRepositories = slotRepositories;
    }

    public execute = async (input: CreateEquipmentTypeInput): Promise<CreateEquipmentTypeOutput> => {
        const label = input.label.trim();

        const existingType = await this.equipmentTypeRepositories.get().findByLabelIgnoreCase(label);
        if (existingType) {
            return { status: EquipmentTypeCreationResult.ALREADY_EXISTS };
        }

        if (input.slotId !== undefined) {
            const slot = await this.slotRepositories.get().findById(input.slotId);
            if (!slot) {
                return { status: EquipmentTypeCreationResult.SLOT_NOT_EXISTS };
            }
        }

        const equipmentType = await this.equipmentTypeRepositories.get().create({ label, slotId: input.slotId ?? null });
        return { status: EquipmentTypeCreationResult.CREATED, equipmentType: toEquipmentTypeDetails(equipmentType) };
    };
}
