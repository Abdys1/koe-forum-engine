export interface EquipmentType {
  id?: number;
  label: string;
  slotId?: number | null;
  parentId?: number | null;
  icon?: string | null;
  sortOrder?: number;
}

export type EquipmentTypeUpdate = Pick<EquipmentType, "label">;
