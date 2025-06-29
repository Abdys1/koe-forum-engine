// https://en.wikipedia.org/wiki/ISO/IEC_5218
export enum Sex {
    MALE = 1,
    FEMALE = 2
}

export interface CharacterEquipement {
    helmet: string | null,
    primaryWeapon: string | null,
    secondaryWeapon: string | null,
    shield: string | null,
    bodyArmor: string | null,
    secondaryArmor: string | null
}

export interface CharacterRegistrationRequestDto {
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string,
    equipement: CharacterEquipement
};