import { CharacterDetails } from "@/lib/api/character/types";

export function resolveActiveCharacter(characters: CharacterDetails[], selectedCharacterId: number | null): CharacterDetails | undefined {
    return characters.find(character => character.id === selectedCharacterId) ?? characters[0];
}
