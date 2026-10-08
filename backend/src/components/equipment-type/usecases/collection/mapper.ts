import { EquipmentTypeEntity } from "@src/components/equipment-type/models/equipment-type";
import { EquipmentTypeCollectionOutput, EquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/types";

export function toEquipmentTypeCollectionOutput(equipmentTypes: EquipmentTypeEntity[]): EquipmentTypeCollectionOutput {
    return equipmentTypes.map(toEquipmentTypeDetails);
}

export function toEquipmentTypeDetails(equipmentType: EquipmentTypeEntity): EquipmentTypeDetails {
    return {
        id: equipmentType.id,
        label: equipmentType.label,
        slotId: equipmentType.slotId ?? null
    };
}
