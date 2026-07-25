import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";
import { CreateEquipmentInput, CreateEquipmentOutput, EquipmentCreation, EquipmentCreationResult } from "@src/components/equipment/usecases/creation/types";

export default class EquipmentCreationImpl implements EquipmentCreation {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public execute = async (input: CreateEquipmentInput): Promise<CreateEquipmentOutput> => {
        const typeExists = await this.equipmentRepository.existsTypeById(input.typeId);
        if (!typeExists) {
            return { status: EquipmentCreationResult.TYPE_NOT_EXISTS };
        }

        const existingEquipment = await this.equipmentRepository.findByNameAndTypeId(input.name, input.typeId);
        if (existingEquipment) {
            return { status: EquipmentCreationResult.ALREADY_EXISTS };
        }

        const equipment = await this.equipmentRepository.create({
            name: input.name,
            typeId: input.typeId,
            description: input.description
        });
        return { status: EquipmentCreationResult.CREATED, equipment: toEquipmentDetails(equipment) };
    };
}
