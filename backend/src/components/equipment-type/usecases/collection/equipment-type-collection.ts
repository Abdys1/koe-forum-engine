import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeCollectionOutput } from "@src/components/equipment-type/usecases/collection/mapper";
import { EquipmentTypeCollection, EquipmentTypeCollectionOutput } from "@src/components/equipment-type/usecases/collection/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentTypeCollectionImpl implements EquipmentTypeCollection {
    private equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>;

    constructor(equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>) {
        this.equipmentTypeRepositories = equipmentTypeRepositories;
    }

    public execute = async (): Promise<EquipmentTypeCollectionOutput> => {
        const equipmentTypes = await this.equipmentTypeRepositories.get().findAll();
        return toEquipmentTypeCollectionOutput(equipmentTypes);
    };
}
