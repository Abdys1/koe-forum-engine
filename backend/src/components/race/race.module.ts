import RaceController from "@src/components/race/race.controller";
import RaceRepositoryImpl from "@src/components/race/repositories/race.repository";
import RaceCollectionUseCaseImpl from "@src/components/race/usecases/collection/race-collection";
import { repositoryProvider } from "@src/components/transaction/transaction.module";
import { asClass } from "awilix";

export const raceModule = {
    raceRepositories: repositoryProvider((client) => new RaceRepositoryImpl(client)),
    raceCollection: asClass(RaceCollectionUseCaseImpl).singleton(),
    raceController: asClass(RaceController).singleton(),
};
