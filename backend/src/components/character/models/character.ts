export default interface CharacterEntity {
    id?: number;
    userId: number;
    name: string;
    race: string;
    sex: number;
    helmet: string | null;
    primaryWeapon: string | null;
    secondaryWeapon: string | null;
    bodyArmor: string | null;
    secondaryArmor: string | null;
    shield: string | null;
    imageUrl: string;
}