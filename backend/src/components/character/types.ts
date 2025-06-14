// https://en.wikipedia.org/wiki/ISO/IEC_5218
export enum Sex {
    MALE = 1,
    FEMALE = 2
}

export interface CharacterEquipement {
    helmet: string,
    primaryWeapon: string,
    secondaryWeapon: string,
    shield: string,
    bodyArmor: string,
    secondaryArmor: string
}

export interface CharacterRegistrationRequestDto {
    name: string,
    sex: Sex,
    race: string,
    equipement: CharacterEquipement,
    imageUrl: string
};