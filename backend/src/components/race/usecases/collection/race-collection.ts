import { RaceRepository } from "@src/components/race/repositories/types";
import { toRaceCollectionOutput } from "@src/components/race/usecases/collection/mapper";
import { RaceCollectionOutput,RaceCollectionUseCase } from "@src/components/race/usecases/collection/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class RaceCollectionUseCaseImpl implements RaceCollectionUseCase {
    constructor(private readonly raceRepositories: RepositoryProvider<RaceRepository>) {}

    public execute = async (): Promise<RaceCollectionOutput> => {
        const races = await this.raceRepositories.get().findAll();
        return toRaceCollectionOutput(races);
    };
}
