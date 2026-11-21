import { RepositoryProvider } from "@src/components/transaction/types";
import { UserRepository } from "@src/components/user/repositories/types";
import {
    CurrentUserInput,
    CurrentUserOutput,
    CurrentUserResult,
    CurrentUserUseCase
} from "@src/components/user/usecases/current_user/types";

export default class CurrentUserUseCaseImpl implements CurrentUserUseCase {
    constructor(private readonly userRepositories: RepositoryProvider<UserRepository>) {}

    public execute = async (input: CurrentUserInput): Promise<CurrentUserOutput> => {
        const user = await this.userRepositories.get().findProfileById(input.userId);
        if (!user) {
            return { status: CurrentUserResult.NOT_FOUND };
        }
        return {
            status: CurrentUserResult.FOUND,
            user: {
                id: user.id,
                username: user.username,
                activeCharacterId: user.activeCharacterId
            }
        };
    };
}
