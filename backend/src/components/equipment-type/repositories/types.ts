import { EquipmentTypeEntity } from "@src/components/equipment-type/models/equipment-type";

export interface EquipmentTypeRepository {
    findAll: () => Promise<EquipmentTypeEntity[]>,
    findById: (id: number) => Promise<EquipmentTypeEntity | null>,
    findByLabelIgnoreCase: (label: string) => Promise<EquipmentTypeEntity | null>,
    countEquipmentByTypeId: (id: number) => Promise<number>,
    create: (equipmentType: EquipmentTypeEntity) => Promise<EquipmentTypeEntity>,
    update: (id: number, label: string) => Promise<EquipmentTypeEntity>,
    delete: (id: number) => Promise<void>
}
