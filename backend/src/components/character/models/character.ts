export default interface CharacterEntity {
  id?: number;
  userId: number;
  name: string;
  race: string;
  sex: number;
  helmet?: number | null;
  primaryWeapon?: number | null;
  secondaryWeapon?: number | null;
  bodyArmor?: number | null;
  secondaryArmor?: number | null;
  shield?: number | null;
  imageUrl: string;
}
