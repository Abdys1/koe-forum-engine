import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";
import { EquipmentModification, EquipmentModificationResult, ModifyEquipmentInput, ModifyEquipmentOutput } from "@src/components/equipment/usecases/modification/types";

export default class EquipmentModificationImpl implements EquipmentModification {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public execute = async (input: ModifyEquipmentInput): Promise<ModifyEquipmentOutput> => {
        const currentEquipment = await this.equipmentRepository.findById(input.id);
        if (!currentEquipment) {
            return { status: EquipmentModificationResult.NOT_FOUND };
        }

        const typeExists = await this.equipmentRepository.existsTypeById(input.typeId);
        if (!typeExists) {
            return { status: EquipmentModificationResult.TYPE_NOT_EXISTS };
        }

        // A saját, változatlan (name, typeId) párjára mentés nem ütközés.
        const equipmentWithName = await this.equipmentRepository.findByNameAndTypeId(input.name, input.typeId);
        if (equipmentWithName && equipmentWithName.id !== input.id) {
            return { status: EquipmentModificationResult.ALREADY_EXISTS };
        }

        const equipment = await this.equipmentRepository.update(input.id, {
            name: input.name,
            typeId: input.typeId,
            description: input.description
        });
        return { status: EquipmentModificationResult.UPDATED, equipment: toEquipmentDetails(equipment) };
    };
}
