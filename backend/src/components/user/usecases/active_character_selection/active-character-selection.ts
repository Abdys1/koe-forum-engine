import { CharacterRepository } from "@src/components/character/repositories/types";
import { RepositoryProvider } from "@src/components/transaction/types";
import { UserRepository } from "@src/components/user/repositories/types";
import {
    ActiveCharacterSelectionInput,
    ActiveCharacterSelectionOutput,
    ActiveCharacterSelectionResult,
    ActiveCharacterSelectionUseCase
} from "@src/components/user/usecases/active_character_selection/types";

export default class ActiveCharacterSelectionUseCaseImpl implements ActiveCharacterSelectionUseCase {
    constructor(
        private readonly userRepositories: RepositoryProvider<UserRepository>,
        private readonly characterRepositories: RepositoryProvider<CharacterRepository>
    ) {}

    public execute = async (input: ActiveCharacterSelectionInput): Promise<ActiveCharacterSelectionOutput> => {
        const character = await this.characterRepositories.get().findById(input.characterId);
        if (!character) {
            return { status: ActiveCharacterSelectionResult.NOT_FOUND };
        }
        if (character.userId !== input.userId) {
            return { status: ActiveCharacterSelectionResult.NOT_OWNED };
        }

        await this.userRepositories.get().setActiveCharacter(input.userId, input.characterId);
        return { status: ActiveCharacterSelectionResult.SELECTED };
    };
}
