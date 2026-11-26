import { Equipment } from "@src/components/equipment/models/equipment";
import { EquipmentCollectionDetails, EquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/types";

export function toEquipmentCollectionOutput(equipmentList: Equipment[]): EquipmentCollectionOutput {
    return equipmentList.map(toEquipmentDetails);
}

export function toEquipmentDetails(equipment: Equipment): EquipmentCollectionDetails {
    return {
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        slotCost: equipment.slotCost,
        typeId: equipment.typeId
    };
}
