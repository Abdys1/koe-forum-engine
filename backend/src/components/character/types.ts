// https://en.wikipedia.org/wiki/ISO/IEC_5218
export enum Sex {
    MALE = 1,
    FEMALE = 2
}

export interface CharacterRegistrationRequestDto {
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string
};