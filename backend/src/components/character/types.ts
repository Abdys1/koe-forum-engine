export type CreateCharacterRequestDto = {
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export type CharacterDetailsResponseDto = {
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export type CreateCharacterDto = {
    username: string,
    charName: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export type CharacterDetails = {
    name: string,
    appearance: string,
    story: string,
    imageUrl: string
};

export type CharacterDetailsCollection = CharacterDetails[];

export type Character = {
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