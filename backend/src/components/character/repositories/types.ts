import CharacterEntity from "@src/components/character/models/character";
import { Repository } from "@src/types";

export interface CharacterRepository extends Repository<CharacterEntity> {
    findAllCharacterByUsername: (username: string) => Promise<CharacterEntity[]>;
    existsByCharacterName: (characterName: string) => Promise<boolean>;
}