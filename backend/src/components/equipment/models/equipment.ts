import { EquipmentType } from "@src/components/equipment-type/models/equipment-type";

export interface Equipment {
    id?: number;
    name: string;
    typeId: number;
    description: string;
    slotCost: number | null;
    type?: EquipmentType;
}

export type EquipmentUpdate = Pick<Equipment, "name" | "description">;
