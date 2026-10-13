import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/mapper";
import { EquipmentCollectionOutput, EquipmentCollectionUseCase } from "@src/components/equipment/usecases/collection/types";

export default class EquipmentCollectionUseCaseImpl implements EquipmentCollectionUseCase {
    private equipmentRepository: EquipmentRepository

    constructor(equipmentRepository: EquipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    public execute = async (): Promise<EquipmentCollectionOutput> => {
        const equipmentList = await this.equipmentRepository.findAll();
        return toEquipmentCollectionOutput(equipmentList);
    }
}