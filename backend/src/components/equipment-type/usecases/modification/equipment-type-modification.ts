import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";
import { EquipmentTypeModification, EquipmentTypeModificationResult, ModifyEquipmentTypeInput, ModifyEquipmentTypeOutput } from "@src/components/equipment-type/usecases/modification/types";

export default class EquipmentTypeModificationImpl implements EquipmentTypeModification {
    private equipmentTypeRepository: EquipmentTypeRepository;

    constructor(equipmentTypeRepository: EquipmentTypeRepository) {
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    public execute = async (input: ModifyEquipmentTypeInput): Promise<ModifyEquipmentTypeOutput> => {
        const label = input.label.trim();

        const currentType = await this.equipmentTypeRepository.findById(input.id);
        if (!currentType) {
            return { status: EquipmentTypeModificationResult.NOT_FOUND };
        }

        // A saját, változatlan label-jére mentés nem ütközés, ezért a találat
        // id-jét is vizsgálni kell, nem csak azt, hogy van-e találat.
        const typeWithLabel = await this.equipmentTypeRepository.findByLabelIgnoreCase(label);
        if (typeWithLabel && typeWithLabel.id !== input.id) {
            return { status: EquipmentTypeModificationResult.ALREADY_EXISTS };
        }

        const equipmentType = await this.equipmentTypeRepository.update(input.id, label);
        return { status: EquipmentTypeModificationResult.UPDATED, equipmentType: toEquipmentTypeDetails(equipmentType) };
    };
}
