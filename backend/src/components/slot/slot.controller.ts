import { SlotCollection } from "@src/components/slot/usecases/collection/types";
import { SlotCreation, SlotCreationResult } from "@src/components/slot/usecases/creation/types";
import { SlotRemoval, SlotRemovalResult } from "@src/components/slot/usecases/removal/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class SlotController {
    private slotCollection: SlotCollection;
    private slotCreation: SlotCreation;
    private slotRemoval: SlotRemoval;

    constructor(
        slotCollection: SlotCollection,
        slotCreation: SlotCreation,
        slotRemoval: SlotRemoval
    ) {
        this.slotCollection = slotCollection;
        this.slotCreation = slotCreation;
        this.slotRemoval = slotRemoval;
    }

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const slots = await this.slotCollection.execute();
        res.status(200).send({ slots });
    };

    public create = async (req: Request, res: Response): Promise<void> => {
        const { status, slot } = await this.slotCreation.execute({
            equipmentTypeId: Number(req.body.equipmentTypeId),
            maxCapacity: Number(req.body.maxCapacity)
        });

        switch (status) {
            case SlotCreationResult.EQUIPMENT_TYPE_NOT_EXISTS:
                res.status(400).json({ errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS });
                return;
            case SlotCreationResult.ALREADY_EXISTS:
                res.status(409).json({ errorCode: ErrorMessages.SLOT_ALREADY_EXISTS });
                return;
            default:
                res.status(201).send(slot);
        }
    };

    public remove = async (req: Request, res: Response): Promise<void> => {
        const { status } = await this.slotRemoval.execute({ id: Number(req.params.id) });

        switch (status) {
            case SlotRemovalResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.SLOT_NOT_EXISTS });
                return;
            default:
                res.status(204).send();
        }
    };
}
