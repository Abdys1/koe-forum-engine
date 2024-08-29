// https://en.wikipedia.org/wiki/ISO/IEC_5218
export enum Sex {
    MALE = 1,
    FEMALE = 2
}

export interface CreateCharacterRequestDto {
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string
};

export interface CharacterDetailsResponseDto {
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string
};

export interface CharacterService {
    getCharactersByUsername: (username: string) => Promise<CharacterDetailsCollection>,
    createCharacter: (newCharacterDto: CreateCharacterDto) => Promise<CreateCharacterStatusDto>
}

export interface CreateCharacterDto {
    owner: string,
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string
};

export interface CharacterDetails {
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string
};

export type CharacterDetailsCollection = CharacterDetails[];

export interface CreateCharacterStatusDto {
    status: CreateCharacterStatus
}

export enum CreateCharacterStatus {
    CREATED = 'CHARACTER_CREATED',
    ALREADY_EXISTS = 'CHARACTER_ALREADY_EXISTS'
}

export interface Character {
    id?: string,
    owner: string,
    race: string,
    name: string,
    sex: Sex,
    imageUrl: string
};

export interface CharacterDao {
    findAllCharacterByUsername: (username: string) => Promise<Character[]>;
    existsByCharacterName: (characterName: string) => Promise<boolean>;
    save: (character: Character) => Promise<void>;
}

export interface CharacterEntity {
    id: number,
    name: string,
    sex: number,
    race: string,
    imageUrl: string,
    userId: number
}