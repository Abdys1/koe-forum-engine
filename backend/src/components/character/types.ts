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
  /**
   * Ismétlődést engedő lista: `[4, 4, 7]` két darab 4-es felszerelést jelent.
   * A request bodyból kimaradhat, ilyenkor a mapper üres listára normalizálja.
   */
  equipmentIds: number[];
}
