import { Equipment, EquipmentUpdate } from "@src/components/equipment/models/equipment";
import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";
import { CrudRepository } from "@src/types";

export interface EquipmentRepository extends CrudRepository<Equipment, EquipmentUpdate> {
    findAllByIds: (ids: number[]) => Promise<Equipment[]>,
    findAllByCharacterId: (characterId: number) => Promise<Equipment[]>,
    replaceAllByCharacterId: (characterId: number, equipmentIds: number[]) => Promise<void>,
    findByNameAndTypeId: (name: string, typeId: number) => Promise<Equipment | null>,
    countAssignmentsById: (id: number) => Promise<number>,
    findSlotUsageByIds: (ids: number[]) => Promise<EquipmentSlotUsage[]>
}
