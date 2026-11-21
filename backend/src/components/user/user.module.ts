import { repositoryProvider } from "@src/components/transaction/transaction.module";
import UserRepositoryImpl from "@src/components/user/repositories/user.repository";
import ActiveCharacterSelectionUseCaseImpl from "@src/components/user/usecases/active_character_selection/active-character-selection";
import CurrentUserUseCaseImpl from "@src/components/user/usecases/current_user/current-user";
import UserController from "@src/components/user/user.controller";
import UserDaoImpl from "@src/components/user/user.dao";
import { asClass } from "awilix";

export const userModule = {
    userDao: asClass(UserDaoImpl).singleton(),
    userRepositories: repositoryProvider((client) => new UserRepositoryImpl(client)),
    currentUser: asClass(CurrentUserUseCaseImpl).singleton(),
    activeCharacterSelection: asClass(ActiveCharacterSelectionUseCaseImpl).singleton(),
    userController: asClass(UserController).singleton(),
};
