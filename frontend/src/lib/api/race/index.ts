import { createAuthenticatedApiClient } from "@/lib/api/client/authenticated-api-client";
import RaceClientImpl from "@/lib/api/race/race.client";
import { RaceClient } from "@/lib/api/race/types";

const raceClient: RaceClient = new RaceClientImpl(createAuthenticatedApiClient());

export { raceClient };
