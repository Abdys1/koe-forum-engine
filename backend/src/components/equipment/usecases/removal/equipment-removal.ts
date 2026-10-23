import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { EquipmentRemovalResult, EquipmentRemovalUseCase, RemoveEquipmentInput, RemoveEquipmentOutput } from "@src/components/equipment/usecases/removal/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentRemovalUseCaseImpl implements EquipmentRemovalUseCase {
    constructor(private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>) {}

    public execute = async (input: RemoveEquipmentInput): Promise<RemoveEquipmentOutput> => {
        const currentEquipment = await this.equipmentRepositories.get().findById(input.id);
        if (!currentEquipment) {
            return { status: EquipmentRemovalResult.NOT_FOUND };
        }
        
        const assignmentCount = await this.equipmentRepositories.get().countAssignmentsById(input.id);
        if (assignmentCount > 0) {
            return { status: EquipmentRemovalResult.IN_USE };
        }

        await this.equipmentRepositories.get().delete(input.id);
        return { status: EquipmentRemovalResult.DELETED };
    };
}
