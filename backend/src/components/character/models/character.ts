import { Equipment } from "@src/components/equipment/models/equipment";

export default interface CharacterEntity {
  id?: number;
  userId: number;
  name: string;
  race: string;
  sex: number;
  imageUrl: string;
  equipmentIds: number[];
  equipment?: CharacterEquipmentAssignment[];
}

export interface CharacterEquipmentAssignment {
  assignmentId: number;
  equipment: Equipment;
}
