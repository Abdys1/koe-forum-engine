export default interface CharacterEntity {
    id?: number;
    userId: number;
    name: string;
    race: string;
    sex: number;
    helmet: string;
    primaryWeapon: string;
    secondaryWeapon: string;
    bodyArmor: string;
    secondaryArmor: string;
    shield: string;
    imageUrl: string;
}