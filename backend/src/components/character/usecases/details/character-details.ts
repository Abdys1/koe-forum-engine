import { CharacterRepository } from "@src/components/character/repositories/types";
import {
    CharacterDetailsInput,
    CharacterDetailsOutput,
    CharacterDetailsResult,
    CharacterDetailsUseCase
} from "@src/components/character/usecases/details/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class CharacterDetailsUseCaseImpl implements CharacterDetailsUseCase {
    constructor(private readonly characterRepositories: RepositoryProvider<CharacterRepository>) {}

    public execute = async (input: CharacterDetailsInput): Promise<CharacterDetailsOutput> => {
        const character = await this.characterRepositories.get().findById(input.characterId);
        if (!character) {
            return { status: CharacterDetailsResult.NOT_FOUND };
        }

        return {
            status: CharacterDetailsResult.FOUND,
            character: {
                id: input.characterId,
                name: character.name,
                sex: character.sex,
                race: character.race,
                imageUrl: character.imageUrl
            }
        };
    };
}
