import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import { EquipmentCollectionOutput } from "@src/components/equipment/usecases/collection/types";

export function toEquipmentCollectionOutput(equipmentList: EquipmentEntity[]): EquipmentCollectionOutput {
    return equipmentList.map(eq => ({
        id: eq.id,
        name: eq.name,
        type: eq.type,
        description: eq.description
    }))
}