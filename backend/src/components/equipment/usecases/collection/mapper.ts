import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import { EquipmentCollectionDetails, EquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";

export function toEquipmentCollectionOutput(equipmentList: EquipmentEntity[]): EquipmentCollectionOutput {
    return equipmentList.map(toEquipmentDetails);
}

export function toEquipmentDetails(equipment: EquipmentEntity): EquipmentCollectionDetails {
    return {
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        type: equipment.type ? toEquipmentTypeDetails(equipment.type) : undefined
    };
}
