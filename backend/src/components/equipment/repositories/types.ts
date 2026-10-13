import { EquipmentEntity, EquipmentUpdate } from "@src/components/equipment/models/equipment";
import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";

export interface EquipmentRepository {
    findAll: () => Promise<EquipmentEntity[]>,
    findAllByIds: (ids: number[]) => Promise<EquipmentEntity[]>,
    findById: (id: number) => Promise<EquipmentEntity | null>,
    findByNameAndTypeId: (name: string, typeId: number) => Promise<EquipmentEntity | null>,
    countAssignmentsById: (id: number) => Promise<number>,
    findSlotUsageByIds: (ids: number[]) => Promise<EquipmentSlotUsage[]>,
    create: (equipment: EquipmentEntity) => Promise<EquipmentEntity>,
    update: (id: number, equipment: EquipmentUpdate) => Promise<EquipmentEntity>,
    delete: (id: number) => Promise<void>
}
