// https://en.wikipedia.org/wiki/ISO/IEC_5218
export enum Sex {
  MALE = 1,
  FEMALE = 2,
}

export interface CharacterRegistrationRequestDto {
  name: string;
  sex: Sex;
  race: string;
  imageUrl: string;
  equipment: CharacterEquipmentInputDto;
}

export interface CharacterEquipmentInputDto {
  helmet?: number | null;
  primaryWeapon?: number | null;
  secondaryWeapon?: number | null;
  shield?: number | null;
  bodyArmor?: number | null;
  secondaryArmor?: number | null;
}
