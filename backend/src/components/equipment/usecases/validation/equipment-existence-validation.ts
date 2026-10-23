import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { RepositoryProvider } from "@src/components/transaction/types";

import { EquipmentExistenceValidationUseCase } from "./types";

export default class EquipmentExistenceValidationUseCaseImpl implements EquipmentExistenceValidationUseCase {
    constructor(private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>) {}

    public execute = async (ids: number[]): Promise<boolean> => {
        const uniqueIds = [...new Set(ids)];
        const found = await this.equipmentRepositories.get().findAllByIds(uniqueIds);
        return found.length === uniqueIds.length;
    };
}
