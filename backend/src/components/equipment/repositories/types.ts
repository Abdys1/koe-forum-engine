import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";

export interface EquipmentRepository {
    findAll: () => Promise<EquipmentEntity[]>,
    findAllByIds: (ids: number[]) => Promise<EquipmentEntity[]>,
    findById: (id: number) => Promise<EquipmentEntity | null>,
    findByNameAndTypeId: (name: string, typeId: number) => Promise<EquipmentEntity | null>,
    countAssignmentsByEquipmentId: (id: number) => Promise<number>,
    findSlotUsageByIds: (ids: number[]) => Promise<EquipmentSlotUsage[]>,
    create: (equipment: EquipmentEntity) => Promise<EquipmentEntity>,
    update: (id: number, equipment: Pick<EquipmentEntity, "name" | "description">) => Promise<EquipmentEntity>,
    delete: (id: number) => Promise<void>
}
