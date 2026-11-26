import { equipmentClient } from "@/lib/api/equipment";
import { EquipmentType } from "@/lib/api/equipment/types";

export function getEquipmentTypes(): Promise<EquipmentType[]> {
    return equipmentClient.getEquipmentTypes();
}
