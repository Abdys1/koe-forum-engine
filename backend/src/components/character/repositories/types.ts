import CharacterEntity from "@src/components/character/models/character";
import { Creatable } from "@src/types";

export interface CharacterRepository extends Creatable<CharacterEntity> {
    findAllCharacterByUserId: (userId: number) => Promise<CharacterEntity[]>;
    existsByCharacterName: (characterName: string) => Promise<boolean>;
}