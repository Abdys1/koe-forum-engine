import type { components } from "@/lib/api/schema";

export type Race = components["schemas"]["Race"];

export interface RaceClient {
    getRaces: () => Promise<Race[]>
}
