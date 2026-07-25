import { EquipmentEntity } from "@src/components/equipment/models/equipment";

export interface EquipmentRepository {
    findAll: () => Promise<EquipmentEntity[]>,
    findAllByIds: (ids: number[]) => Promise<EquipmentEntity[]>,
    findById: (id: number) => Promise<EquipmentEntity | null>,
    findByNameAndTypeId: (name: string, typeId: number) => Promise<EquipmentEntity | null>,
    countAssignmentsByEquipmentId: (id: number) => Promise<number>,
    existsTypeById: (typeId: number) => Promise<boolean>,
    create: (equipment: EquipmentEntity) => Promise<EquipmentEntity>,
    update: (id: number, equipment: EquipmentEntity) => Promise<EquipmentEntity>,
    delete: (id: number) => Promise<void>
}
