import { EquipmentTypeCollection } from "@src/components/equipment-type/usecases/collection/types";
import { EquipmentTypeCreation, EquipmentTypeCreationResult } from "@src/components/equipment-type/usecases/creation/types";
import { EquipmentTypeModification, EquipmentTypeModificationResult } from "@src/components/equipment-type/usecases/modification/types";
import { EquipmentTypeRemoval, EquipmentTypeRemovalResult } from "@src/components/equipment-type/usecases/removal/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class EquipmentTypeController {
    private equipmentTypeCollection: EquipmentTypeCollection;
    private equipmentTypeCreation: EquipmentTypeCreation;
    private equipmentTypeModification: EquipmentTypeModification;
    private equipmentTypeRemoval: EquipmentTypeRemoval;

    constructor(
        equipmentTypeCollection: EquipmentTypeCollection,
        equipmentTypeCreation: EquipmentTypeCreation,
        equipmentTypeModification: EquipmentTypeModification,
        equipmentTypeRemoval: EquipmentTypeRemoval
    ) {
        this.equipmentTypeCollection = equipmentTypeCollection;
        this.equipmentTypeCreation = equipmentTypeCreation;
        this.equipmentTypeModification = equipmentTypeModification;
        this.equipmentTypeRemoval = equipmentTypeRemoval;
    }

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const equipmentTypes = await this.equipmentTypeCollection.execute();
        res.status(200).send({ equipmentTypes });
    };

    public create = async (req: Request, res: Response): Promise<void> => {
        const { status, equipmentType } = await this.equipmentTypeCreation.execute({
            label: req.body.label,
            slotId: req.body.slotId === undefined ? undefined : Number(req.body.slotId)
        });

        switch (status) {
            case EquipmentTypeCreationResult.ALREADY_EXISTS:
                res.status(409).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_ALREADY_EXISTS });
                return;
            case EquipmentTypeCreationResult.SLOT_NOT_EXISTS:
                res.status(422).json({ errorCode: ErrorMessages.SLOT_NOT_EXISTS });
                return;
            default:
                res.status(201).send(equipmentType);
        }
    };

    public update = async (req: Request, res: Response): Promise<void> => {
        const { status, equipmentType } = await this.equipmentTypeModification.execute({
            id: Number(req.params.id),
            label: req.body.label
        });

        switch (status) {
            case EquipmentTypeModificationResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS });
                return;
            case EquipmentTypeModificationResult.ALREADY_EXISTS:
                res.status(409).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_ALREADY_EXISTS });
                return;
            default:
                res.status(200).send(equipmentType);
        }
    };

    public remove = async (req: Request, res: Response): Promise<void> => {
        const { status } = await this.equipmentTypeRemoval.execute({ id: Number(req.params.id) });

        switch (status) {
            case EquipmentTypeRemovalResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS });
                return;
            case EquipmentTypeRemovalResult.IN_USE:
                res.status(409).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_IN_USE });
                return;
            default:
                res.status(204).send();
        }
    };
}
