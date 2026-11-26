import { RaceEntity } from "@src/components/race/models/race";
import { RaceCollectionDetails,RaceCollectionOutput } from "@src/components/race/usecases/collection/types";

export function toRaceCollectionOutput(races: RaceEntity[]): RaceCollectionOutput {
    return races.map(toRaceDetails);
}

function toRaceDetails(race: RaceEntity): RaceCollectionDetails {
    return {
        id: race.id,
        name: race.name,
        teaser: race.teaser,
        description: race.description,
        imageUrl: race.imageUrl,
        buttonImageUrl: race.buttonImageUrl
    };
}
