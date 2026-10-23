import { CharacterRepository } from "@src/components/character/repositories/types";
import { toOutput } from "@src/components/character/usecases/collection/mapper";
import { CharacterCollectionOutput, CharacterCollectionUseCase } from "@src/components/character/usecases/collection/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class CharacterCollectionUseCaseImpl implements CharacterCollectionUseCase {
    private characterRepositories: RepositoryProvider<CharacterRepository>;

    constructor(characterRepositories: RepositoryProvider<CharacterRepository>) {
        this.characterRepositories = characterRepositories;
    }

    public execute = async (userId: number): Promise<CharacterCollectionOutput> => {
        const characters = await this.characterRepositories.get().findAllCharacterByUserId(userId);
        return toOutput(characters);
    }
}
