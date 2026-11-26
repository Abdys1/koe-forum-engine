import CharacterRegistrationRequestMapper from "@src/components/character/character-dto.mapper";
import { CharacterCollectionUseCase } from "@src/components/character/usecases/collection/types";
import { CharacterDetailsResult, CharacterDetailsUseCase } from "@src/components/character/usecases/details/types";
import { CharacterEquipmentCollectionResult, CharacterEquipmentCollectionUseCase } from "@src/components/character/usecases/equipment_collection/types";
import { CharacterEquipmentModificationResult, CharacterEquipmentModificationUseCase } from "@src/components/character/usecases/equipment_modification/types";
import { CharacterNameAvailabilityResult, CharacterNameAvailabilityUseCase } from "@src/components/character/usecases/name_availability/types";
import { CharacterRegistrationUseCase, CreateCharacterInput } from "@src/components/character/usecases/registration/types";
import { CharacterUpdateValidatorUseCase, ValidateCharacterUpdateResult } from "@src/components/character/usecases/update_validator/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class CharacterController {
    constructor(
        private readonly characterRegistration: CharacterRegistrationUseCase,
        private readonly characterCollection: CharacterCollectionUseCase,
        private readonly characterDetails: CharacterDetailsUseCase,
        private readonly characterUpdateValidator: CharacterUpdateValidatorUseCase,
        private readonly characterEquipmentCollection: CharacterEquipmentCollectionUseCase,
        private readonly characterEquipmentModification: CharacterEquipmentModificationUseCase,
        private readonly characterNameAvailability: CharacterNameAvailabilityUseCase
    ) {}

    createCharacter = async (req: Request, res: Response): Promise<void> => {
        const characterUpdateValidatorInput = CharacterRegistrationRequestMapper.toValidateCharacterUpdateInput(req.user, req.body);
        const { status } = await this.characterUpdateValidator.execute(characterUpdateValidatorInput);
        if (status !== ValidateCharacterUpdateResult.VALID) {
            this.sendCreateCharErrorByStatus(res, status);
            return;
        }

        const createCharInput: CreateCharacterInput = CharacterRegistrationRequestMapper.toCreateCharacterInput(req.user, req.body, req.file!);
        const character = await this.characterRegistration.execute(createCharInput);
        res.status(200).send(character);
    }

    validateCharacterName = async (req: Request, res: Response): Promise<void> => {
        const result = await this.characterNameAvailability.execute(req.body.name);
        if (result === CharacterNameAvailabilityResult.TAKEN) {
            res.status(409).json({ errorCode: ErrorMessages.CHARACTER_ALREADY_EXISTS });
            return;
        }
        res.status(204).send();
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

    getCharacter = async (req: Request, res: Response): Promise<void> => {
        const { status, character } = await this.characterDetails.execute({
            characterId: Number(req.params.id)
        });

        if (status === CharacterDetailsResult.NOT_FOUND) {
            res.status(404).json({ errorCode: ErrorMessages.CHARACTER_NOT_EXISTS });
            return;
        }
        res.status(200).send(character);
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

    setCharacterEquipment = async (req: Request, res: Response): Promise<void> => {
        const { status, equipment } = await this.characterEquipmentModification.execute({
            characterId: Number(req.params.id),
            userId: req.user.id,
            equipmentIds: req.body.equipmentIds
        });

        switch (status) {
            case CharacterEquipmentModificationResult.NOT_FOUND:
                res.status(404).json({ errorCode: ErrorMessages.CHARACTER_NOT_EXISTS });
                return;
            case CharacterEquipmentModificationResult.NOT_OWNED:
                res.status(403).json({ errorCode: ErrorMessages.CHARACTER_NOT_OWNED });
                return;
            case CharacterEquipmentModificationResult.EQUIPMENT_NOT_EXISTS:
                res.status(422).json({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
                return;
            case CharacterEquipmentModificationResult.SLOT_CAPACITY_EXCEEDED:
                res.status(422).json({ errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED });
                return;
            default:
                res.status(200).send(equipment);
        }
    }
}
