import { CharacterRepository } from "@src/components/character/repositories/types";
import { CharacterNameAvailabilityResult, CharacterNameAvailabilityUseCase } from "@src/components/character/usecases/name_availability/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class CharacterNameAvailabilityUseCaseImpl implements CharacterNameAvailabilityUseCase {
    constructor(private readonly characterRepositories: RepositoryProvider<CharacterRepository>) {}

    public execute = async (name: string): Promise<CharacterNameAvailabilityResult> => {
        const taken = await this.characterRepositories.get().existsByCharacterName(name);
        return taken ? CharacterNameAvailabilityResult.TAKEN : CharacterNameAvailabilityResult.AVAILABLE;
    };
}
