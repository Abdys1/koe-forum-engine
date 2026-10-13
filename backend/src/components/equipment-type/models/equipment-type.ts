export interface EquipmentType {
  id?: number;
  label: string;
  slotId?: number | null;
}

export type EquipmentTypeUpdate = Pick<EquipmentType, "label">;
