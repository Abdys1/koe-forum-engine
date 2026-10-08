import { EquipmentTypeEntity } from "@src/components/equipment-type/models/equipment-type";

export interface EquipmentEntity {
    id?: number;
    name: string;
    typeId: number;
    description: string;
    slotCost: number | null;
    type?: EquipmentTypeEntity;
}
