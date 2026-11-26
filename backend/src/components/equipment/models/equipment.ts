export interface Equipment {
    id?: number;
    name: string;
    typeId: number;
    description: string;
    slotCost: number | null;
}

export type EquipmentUpdate = Pick<Equipment, "name" | "description">;
