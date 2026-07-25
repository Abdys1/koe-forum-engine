import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeCollectionOutput } from "@src/components/equipment-type/usecases/collection/mapper";
import { EquipmentTypeCollection, EquipmentTypeCollectionOutput } from "@src/components/equipment-type/usecases/collection/types";

export default class EquipmentTypeCollectionImpl implements EquipmentTypeCollection {
    private equipmentTypeRepository: EquipmentTypeRepository;

    constructor(equipmentTypeRepository: EquipmentTypeRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    public execute = async (): Promise<EquipmentTypeCollectionOutput> => {
        const equipmentTypes = await this.equipmentTypeRepository.findAll();
        return toEquipmentTypeCollectionOutput(equipmentTypes);
    };
}
