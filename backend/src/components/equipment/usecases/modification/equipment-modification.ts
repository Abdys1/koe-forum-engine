import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";
import { EquipmentModificationResult, EquipmentModificationUseCase, ModifyEquipmentInput, ModifyEquipmentOutput } from "@src/components/equipment/usecases/modification/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentModificationUseCaseImpl implements EquipmentModificationUseCase {
    constructor(private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>) {}

    public execute = async (input: ModifyEquipmentInput): Promise<ModifyEquipmentOutput> => {
        const currentEquipment = await this.equipmentRepositories.get().findById(input.id);
        if (!currentEquipment) {
            return { status: EquipmentModificationResult.NOT_FOUND };
        }

        const equipmentWithName = await this.equipmentRepositories.get().findByNameAndTypeId(input.name, currentEquipment.typeId);
        if (equipmentWithName && equipmentWithName.id !== input.id) {
            return { status: EquipmentModificationResult.ALREADY_EXISTS };
        }

        const equipment = await this.equipmentRepositories.get().update(input.id, {
            name: input.name,
            description: input.description
        });
        return { status: EquipmentModificationResult.UPDATED, equipment: toEquipmentDetails(equipment) };
    };
}
