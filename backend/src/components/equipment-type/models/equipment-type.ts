import { SlotEntity } from "@src/components/slot/models/slot";

export interface EquipmentType {
  id?: number;
  label: string;
  slotId?: number | null;
  slot?: SlotEntity | null;
  parentId?: number | null;
  icon?: string | null;
  sortOrder?: number;
}

export type EquipmentTypeUpdate = Pick<EquipmentType, "label">;
