import { EquipmentCollection } from "@src/components/equipment/usecases/collection/types";
import { EquipmentCreation, EquipmentCreationResult } from "@src/components/equipment/usecases/creation/types";
import { EquipmentModification, EquipmentModificationResult } from "@src/components/equipment/usecases/modification/types";
import { EquipmentRemoval, EquipmentRemovalResult } from "@src/components/equipment/usecases/removal/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class EquipmentController {
    private equipmentCollection: EquipmentCollection;
    private equipmentCreation: EquipmentCreation;
    private equipmentModification: EquipmentModification;
    private equipmentRemoval: EquipmentRemoval;

    constructor(
        equipmentCollection: EquipmentCollection,
        equipmentCreation: EquipmentCreation,
        equipmentModification: EquipmentModification,
        equipmentRemoval: EquipmentRemoval
    ) {
        this.equipmentCollection = equipmentCollection;
        this.equipmentCreation = equipmentCreation;
        this.equipmentModification = equipmentModification;
        this.equipmentRemoval = equipmentRemoval;
    }

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const equipments = await this.equipmentCollection.execute();
        res.status(200).send({ equipments: equipments });
    };

    public create = async (req: Request, res: Response): Promise<void> => {
        const { status, equipment } = await this.equipmentCreation.execute({
            name: req.body.name,
            typeId: Number(req.body.typeId),
            description: req.body.description,
            slotCost: req.body.slotCost === undefined ? undefined : Number(req.body.slotCost)
        });

        switch (status) {
            case EquipmentCreationResult.TYPE_NOT_EXISTS:
                res.status(422).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS });
                return;
            case EquipmentCreationResult.SLOT_COST_REQUIRED:
                res.status(422).json({ errorCode: ErrorMessages.EQUIPMENT_SLOT_COST_REQUIRED });
                return;
            case EquipmentCreationResult.SLOT_COST_NOT_ALLOWED:
                res.status(422).json({ errorCode: ErrorMessages.EQUIPMENT_SLOT_COST_NOT_ALLOWED });
                return;
            case EquipmentCreationResult.SLOT_COST_EXCEEDS_CAPACITY:
                res.status(422).json({ errorCode: ErrorMessages.EQUIPMENT_SLOT_COST_EXCEEDS_CAPACITY });
                return;
            case EquipmentCreationResult.ALREADY_EXISTS:
                res.status(409).json({ errorCode: ErrorMessages.EQUIPMENT_ALREADY_EXISTS });
                return;
            default:
                res.status(201).send(equipment);
        }
    };

    public update = async (req: Request, res: Response): Promise<void> => {
        const { status, equipment } = await this.equipmentModification.execute({
            id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description
        });

        switch (status) {
            case EquipmentModificationResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
                return;
            case EquipmentModificationResult.ALREADY_EXISTS:
                res.status(409).json({ errorCode: ErrorMessages.EQUIPMENT_ALREADY_EXISTS });
                return;
            default:
                res.status(200).send(equipment);
        }
    };

    public remove = async (req: Request, res: Response): Promise<void> => {
        const { status } = await this.equipmentRemoval.execute({ id: Number(req.params.id) });

        switch (status) {
            case EquipmentRemovalResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
                return;
            case EquipmentRemovalResult.IN_USE:
                res.status(409).json({ errorCode: ErrorMessages.EQUIPMENT_IN_USE });
                return;
            default:
                res.status(204).send();
        }
    };
}
