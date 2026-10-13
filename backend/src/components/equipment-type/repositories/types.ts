import { EquipmentType, EquipmentTypeUpdate } from "@src/components/equipment-type/models/equipment-type";

export interface EquipmentTypeRepository {
    findAll: () => Promise<EquipmentType[]>,
    findById: (id: number) => Promise<EquipmentType | null>,
    findByLabelIgnoreCase: (label: string) => Promise<EquipmentType | null>,
    countEquipmentByTypeId: (id: number) => Promise<number>,
    create: (equipmentType: EquipmentType) => Promise<EquipmentType>,
    update: (id: number, equipmentType: EquipmentTypeUpdate) => Promise<EquipmentType>,
    delete: (id: number) => Promise<void>
}
