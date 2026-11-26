import { RaceCollectionUseCase } from "@src/components/race/usecases/collection/types";
import { Request, Response } from "express";

export default class RaceController {
    constructor(private readonly raceCollection: RaceCollectionUseCase) {}

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const races = await this.raceCollection.execute();
        res.status(200).send({ races });
    };
}
