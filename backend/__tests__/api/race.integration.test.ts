import RaceClient from "@test/clients/race-client";
import { saveRaceToDb } from "@test/utils/test-data-generator";
import { describe, it } from "vitest";

describe('/api/races', () => {
    let raceClient: RaceClient;

    beforeAll(async () => {
        raceClient = new RaceClient();
    });

    describe('GET /', () => {
        it('when there is no race then should return an empty list', async () => {
            const resp = await raceClient.getAllRaces();

            expect(resp.status).toBe(200);
            expect(resp.body.races).toStrictEqual([]);
        });

        it('when there are races then should return them ordered by sort order then name', async () => {
            const orc = await saveRaceToDb({ name: 'Ork', sortOrder: 1 });
            const elf = await saveRaceToDb({ name: 'Elf', sortOrder: 1 });
            const human = await saveRaceToDb({ name: 'Ember', sortOrder: 0 });

            const resp = await raceClient.getAllRaces();

            expect(resp.status).toBe(200);
            expect(resp.body.races).toStrictEqual([human, elf, orc].map((race) => ({
                id: race.id,
                name: race.name,
                teaser: race.teaser,
                description: race.description,
                imageUrl: race.imageUrl,
                buttonImageUrl: race.buttonImageUrl
            })));
        });
    });
});
