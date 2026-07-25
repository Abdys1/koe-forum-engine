import { EquipmentEntity } from "@src/components/equipment/models/equipment";

export default interface CharacterEntity {
  id?: number;
  userId: number;
  name: string;
  race: string;
  sex: number;
  imageUrl: string;
  /**
   * Írási út: ahány elem, annyi `CharacterEquipment` sor jön létre. Ismétlődés
   * engedett — ugyanaz a felszerelés több példányban is hozzárendelhető.
   */
  equipmentIds: number[];
  /**
   * Olvasási út: a join-olt hozzárendelések. Csak azokon a lekérdezéseken van
   * kitöltve, amelyek include-olják a felszerelést.
   */
  equipment?: CharacterEquipmentAssignmentEntity[];
}

/** Egy konkrét hozzárendelés: a saját azonosítója és a hozzárendelt felszerelés. */
export interface CharacterEquipmentAssignmentEntity {
  assignmentId: number;
  equipment: EquipmentEntity;
}
