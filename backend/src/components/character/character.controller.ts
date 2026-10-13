import CharacterRegistrationRequestMapper from "@src/components/character/character-dto.mapper";
import { CharacterCollectionUseCase } from "@src/components/character/usecases/collection/types";
import { CharacterEquipmentCollectionResult, CharacterEquipmentCollectionUseCase } from "@src/components/character/usecases/equipment_collection/types";
import { CharacterRegistrationUseCase, CreateCharacterInput } from "@src/components/character/usecases/registration/types";
import { CharacterUpdateValidatorUseCase, ValidateCharacterUpdateResult } from "@src/components/character/usecases/update_validator/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class CharacterController {
    constructor(
        private readonly characterRegistration: CharacterRegistrationUseCase,
        private readonly characterCollection: CharacterCollectionUseCase,
        private readonly characterUpdateValidator: CharacterUpdateValidatorUseCase,
        private readonly characterEquipmentCollection: CharacterEquipmentCollectionUseCase
    ) {}

    createCharacter = async (req: Request, res: Response): Promise<void> => {
        const characterUpdateValidatorInput = CharacterRegistrationRequestMapper.toValidateCharacterUpdateInput(req.user, req.body);
        const { status } = await this.characterUpdateValidator.execute(characterUpdateValidatorInput);
        if (status !== ValidateCharacterUpdateResult.VALID) {
            this.sendCreateCharErrorByStatus(res, status);
            return;
        }

        const createCharInput: CreateCharacterInput = CharacterRegistrationRequestMapper.toCreateCharacterInput(req.user, req.body);
        await this.characterRegistration.execute(createCharInput);
        res.status(200).send();
    }

    private sendCreateCharErrorByStatus = (res: Response, status: ValidateCharacterUpdateResult): void => {
        switch (status) {
            case ValidateCharacterUpdateResult.ALREADY_EXISTS:
                res.status(409).json({ errorCode: ErrorMessages.CHARACTER_ALREADY_EXISTS });
                break;
            case ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS:
                res.status(422).json({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
                break;
            case ValidateCharacterUpdateResult.SLOT_CAPACITY_EXCEEDED:
                res.status(422).json({ errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED });
                break;
        }
        res.send();
    }

    listCharacters = async (req: Request, res: Response): Promise<void> => {
        const characters = await this.characterCollection.execute(req.user.id);
        res.status(200).send(characters);
    }

    listCharacterEquipment = async (req: Request, res: Response): Promise<void> => {
        const { status, equipment } = await this.characterEquipmentCollection.execute({
            characterId: Number(req.params.id)
        });

        if (status === CharacterEquipmentCollectionResult.NOT_FOUND) {
            res.status(404).json({ errorCode: ErrorMessages.CHARACTER_NOT_EXISTS });
            return;
        }
        res.status(200).send(equipment);
    }
}
