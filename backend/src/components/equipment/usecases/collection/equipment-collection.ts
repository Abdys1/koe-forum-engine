import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/mapper";
import { EquipmentCollectionOutput, EquipmentCollectionUseCase } from "@src/components/equipment/usecases/collection/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentCollectionUseCaseImpl implements EquipmentCollectionUseCase {
    private equipmentRepositories: RepositoryProvider<EquipmentRepository>

    constructor(equipmentRepositories: RepositoryProvider<EquipmentRepository>) {
        this.equipmentRepositories = equipmentRepositories;
    }

    public execute = async (): Promise<EquipmentCollectionOutput> => {
        const equipmentList = await this.equipmentRepositories.get().findAll();
        return toEquipmentCollectionOutput(equipmentList);
    }
}