import { CharacterRepository } from "@src/components/character/repositories/types";
import { toOutput } from "@src/components/character/usecases/collection/mapper";
import { CharacterCollectionOutput, CharacterCollectionUseCase } from "@src/components/character/usecases/collection/types";

export default class CharacterCollectionUseCaseImpl implements CharacterCollectionUseCase {
    private characterRepository: CharacterRepository;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository;
    }

    public execute = async (userId: number): Promise<CharacterCollectionOutput> => {
        const characters = await this.characterRepository.findAllCharacterByUserId(userId);
        return toOutput(characters);
    }
}
