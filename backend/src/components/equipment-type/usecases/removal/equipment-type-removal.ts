import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { EquipmentTypeRemoval, EquipmentTypeRemovalResult, RemoveEquipmentTypeInput, RemoveEquipmentTypeOutput } from "@src/components/equipment-type/usecases/removal/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentTypeRemovalImpl implements EquipmentTypeRemoval {
    private equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>;

    constructor(equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>) {
        this.equipmentTypeRepositories = equipmentTypeRepositories;
    }

    public execute = async (input: RemoveEquipmentTypeInput): Promise<RemoveEquipmentTypeOutput> => {
        const currentType = await this.equipmentTypeRepositories.get().findById(input.id);
        if (!currentType) {
            return { status: EquipmentTypeRemovalResult.NOT_FOUND };
        }

        const referencingEquipmentCount = await this.equipmentTypeRepositories.get().countEquipmentByTypeId(input.id);
        if (referencingEquipmentCount > 0) {
            return { status: EquipmentTypeRemovalResult.IN_USE };
        }

        await this.equipmentTypeRepositories.get().delete(input.id);
        return { status: EquipmentTypeRemovalResult.DELETED };
    };
}
