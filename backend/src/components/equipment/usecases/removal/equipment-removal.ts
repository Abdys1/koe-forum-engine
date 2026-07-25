import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { EquipmentRemoval, EquipmentRemovalResult, RemoveEquipmentInput, RemoveEquipmentOutput } from "@src/components/equipment/usecases/removal/types";

export default class EquipmentRemovalImpl implements EquipmentRemoval {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public execute = async (input: RemoveEquipmentInput): Promise<RemoveEquipmentOutput> => {
        const currentEquipment = await this.equipmentRepository.findById(input.id);
        if (!currentEquipment) {
            return { status: EquipmentRemovalResult.NOT_FOUND };
        }
        
        const assignmentCount = await this.equipmentRepository.countAssignmentsByEquipmentId(input.id);
        if (assignmentCount > 0) {
            return { status: EquipmentRemovalResult.IN_USE };
        }

        await this.equipmentRepository.delete(input.id);
        return { status: EquipmentRemovalResult.DELETED };
    };
}
