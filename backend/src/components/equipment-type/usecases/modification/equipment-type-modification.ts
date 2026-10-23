import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";
import { EquipmentTypeModification, EquipmentTypeModificationResult, ModifyEquipmentTypeInput, ModifyEquipmentTypeOutput } from "@src/components/equipment-type/usecases/modification/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentTypeModificationImpl implements EquipmentTypeModification {
    private equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>;

    constructor(equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>) {
        this.equipmentTypeRepositories = equipmentTypeRepositories;
    }

    public execute = async (input: ModifyEquipmentTypeInput): Promise<ModifyEquipmentTypeOutput> => {
        const label = input.label.trim();

        const currentType = await this.equipmentTypeRepositories.get().findById(input.id);
        if (!currentType) {
            return { status: EquipmentTypeModificationResult.NOT_FOUND };
        }

        // A saját, változatlan label-jére mentés nem ütközés, ezért a találat
        // id-jét is vizsgálni kell, nem csak azt, hogy van-e találat.
        const typeWithLabel = await this.equipmentTypeRepositories.get().findByLabelIgnoreCase(label);
        if (typeWithLabel && typeWithLabel.id !== input.id) {
            return { status: EquipmentTypeModificationResult.ALREADY_EXISTS };
        }

        const equipmentType = await this.equipmentTypeRepositories.get().update(input.id, { label });
        return { status: EquipmentTypeModificationResult.UPDATED, equipmentType: toEquipmentTypeDetails(equipmentType) };
    };
}
