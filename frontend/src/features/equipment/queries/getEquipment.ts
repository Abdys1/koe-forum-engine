import { equipmentClient } from "@/lib/api/equipment";
import { Equipment } from "@/lib/api/equipment/types";

export function getEquipment(): Promise<Equipment[]> {
    return equipmentClient.getEquipment();
}
