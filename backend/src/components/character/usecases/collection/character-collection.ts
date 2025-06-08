import { CharacterRepository } from "@src/components/character/repositories/types";
import { toOutput } from "@src/components/character/usecases/collection/mapper";
import { CharacterCollection, CharacterCollectionOutput } from "@src/components/character/usecases/collection/types";

export default class CharacterCollectionImpl implements CharacterCollection {
    private characterRepository: CharacterRepository;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository;
    }

    execute = async (username: string): Promise<CharacterCollectionOutput> => {
        const characters = await this.characterRepository.findAllCharacterByUsername(username);
        return toOutput(characters);
    }
}
