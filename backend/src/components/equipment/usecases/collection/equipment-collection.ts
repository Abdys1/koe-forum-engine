import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/mapper";
import { EquipmentCollection, EquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/types";

export default class EquipmentCollectionImpl implements EquipmentCollection {
    private equipmentRepository: EquipmentRepository

    constructor(equipmentRepository: EquipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    public execute = async (): Promise<EquipmentCollectionOutput> => {
        const equipmentList = await this.equipmentRepository.findAll();
        return toEquipmentCollectionOutput(equipmentList);
    }
}