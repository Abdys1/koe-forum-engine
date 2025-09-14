export default interface CharacterEntity {
  id?: number;
  userId: number;
  name: string;
  race: string;
  sex: number;
  helmetId?: number | null;
  primaryWeaponId?: number | null;
  secondaryWeaponId?: number | null;
  bodyArmorId?: number | null;
  secondaryArmorId?: number | null;
  shieldId?: number | null;
  imageUrl: string;
}
