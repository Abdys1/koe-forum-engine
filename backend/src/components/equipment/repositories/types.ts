import { Equipment, EquipmentUpdate } from "@src/components/equipment/models/equipment";
import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";

export interface EquipmentRepository {
    findAll: () => Promise<Equipment[]>,
    findAllByIds: (ids: number[]) => Promise<Equipment[]>,
    findById: (id: number) => Promise<Equipment | null>,
    findByNameAndTypeId: (name: string, typeId: number) => Promise<Equipment | null>,
    countAssignmentsById: (id: number) => Promise<number>,
    findSlotUsageByIds: (ids: number[]) => Promise<EquipmentSlotUsage[]>,
    create: (equipment: Equipment) => Promise<Equipment>,
    update: (id: number, equipment: EquipmentUpdate) => Promise<Equipment>,
    delete: (id: number) => Promise<void>
}
