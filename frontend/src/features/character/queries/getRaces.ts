import { raceClient } from "@/lib/api/race";
import type { Race } from "@/lib/api/race/types";

export async function getRaces(): Promise<Race[]> {
    return raceClient.getRaces();
}
