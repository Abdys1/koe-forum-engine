import { RaceEntity } from "@src/components/race/models/race";

export interface RaceRepository {
    findAll: () => Promise<RaceEntity[]>
    existsById: (id: number) => Promise<boolean>
}
