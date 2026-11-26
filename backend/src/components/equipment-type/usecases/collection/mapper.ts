import { EquipmentType } from "@src/components/equipment-type/models/equipment-type";
import { EquipmentTypeCollectionOutput, EquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/types";
import { toSlotDetails } from "@src/components/slot/usecases/collection/mapper";

export function toEquipmentTypeCollectionOutput(equipmentTypes: EquipmentType[]): EquipmentTypeCollectionOutput {
    return equipmentTypes.map(toEquipmentTypeDetails);
}

export function toEquipmentTypeDetails(equipmentType: EquipmentType): EquipmentTypeDetails {
    return {
        id: equipmentType.id,
        label: equipmentType.label,
        slot: equipmentType.slot ? toSlotDetails(equipmentType.slot) : null,
        parentId: equipmentType.parentId ?? null,
        icon: equipmentType.icon ?? null,
        sortOrder: equipmentType.sortOrder ?? 0
    };
}
