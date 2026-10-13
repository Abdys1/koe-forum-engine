import { EquipmentType } from "@src/components/equipment-type/models/equipment-type";
import { EquipmentTypeCollectionOutput, EquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/types";

export function toEquipmentTypeCollectionOutput(equipmentTypes: EquipmentType[]): EquipmentTypeCollectionOutput {
    return equipmentTypes.map(toEquipmentTypeDetails);
}

export function toEquipmentTypeDetails(equipmentType: EquipmentType): EquipmentTypeDetails {
    return {
        id: equipmentType.id,
        label: equipmentType.label,
        slotId: equipmentType.slotId ?? null
    };
}
