import CharacterEntity from "@src/components/character/models/character";

export interface CharacterRepository {
    findAllCharacterByUsername: (username: string) => Promise<CharacterEntity[]>;
    existsByCharacterName: (characterName: string) => Promise<boolean>;
    save: (character: CharacterEntity) => Promise<void>;
}