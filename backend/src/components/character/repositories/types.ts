import Character, { NewCharacter } from "@src/components/character/models/character";
import { Creatable } from "@src/types";

export interface CharacterRepository extends Creatable<Character, NewCharacter> {
    findById: (id: number) => Promise<Character | null>;
    findAllCharacterByUserId: (userId: number) => Promise<Character[]>;
    existsByCharacterName: (characterName: string) => Promise<boolean>;
}
