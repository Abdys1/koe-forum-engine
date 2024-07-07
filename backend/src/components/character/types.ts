export interface CreateCharacterRequestDto {
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export interface CharacterDetailsResponseDto {
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export interface CreateCharacterDto {
    username: string,
    charName: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export interface CharacterDetails {
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export type CharacterDetailsCollection = CharacterDetails[];

export interface Character {
    owner: string,
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export interface CharacterDao {
    findAllCharacterByUsername: (username: string) => Promise<Character[]>;
    existByCharacterName: (characterName: string) => Promise<boolean>;
    save: (character: Character) => Promise<void>;
}