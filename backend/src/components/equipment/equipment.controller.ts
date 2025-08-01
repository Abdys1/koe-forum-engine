import { EquipmentCollection } from "@src/components/equipment/usecases/collection/types";
import { Request, Response } from "express";

export default class EquipmentController {
    private equipmentCollection: EquipmentCollection;

    constructor(equipmentCollection: EquipmentCollection) {
        this.equipmentCollection = equipmentCollection;
    }

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const equipments = await this.equipmentCollection.execute();
        res.status(200).send({ equipments: equipments });
    }
}