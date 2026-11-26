import { RaceEntity } from "@src/components/race/models/race";
import { RaceRepository } from "@src/components/race/repositories/types";
import { DbClient } from "@src/prisma-client";

const FIELDS = {
    id: true,
    name: true,
    teaser: true,
    description: true,
    imageUrl: true,
    buttonImageUrl: true
} as const;

export default class RaceRepositoryImpl implements RaceRepository {
    constructor(private readonly db: DbClient) {}

    public findAll = async (): Promise<RaceEntity[]> => {
        return this.db.race.findMany({
            select: FIELDS,
            orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
        });
    };

    public existsById = async (id: number): Promise<boolean> => {
        const count = await this.db.race.count({ where: { id } });
        return count > 0;
    };
}
