import CharacterRegistrationRequestMapper from "@src/components/character/character-dto.mapper";
import { CharacterCollection } from "@src/components/character/usecases/collection/types";
import { CharacterRegistration, CreateCharacterInput } from "@src/components/character/usecases/registration/types";
import { CharacterUpdateValidator, ValidateCharacterUpdateResult } from "@src/components/character/usecases/update_validator/types";
import { ErrorMessages } from "@src/messages";
import { Request, Response } from "express";

export default class CharacterController {
    private characterRegistration: CharacterRegistration;
    private characterCollection: CharacterCollection;
    private characterUpdateValidator: CharacterUpdateValidator;

    constructor(characterRegistration: CharacterRegistration, characterCollection: CharacterCollection, characterUpdateValidator: CharacterUpdateValidator) {
        this.characterRegistration = characterRegistration;
        this.characterCollection = characterCollection;
        this.characterUpdateValidator = characterUpdateValidator;
    }

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
                res.status(400).json({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
                break;
        }
        res.send();
    }

    listCharacters = async (req: Request, res: Response): Promise<void> => {
        const characters = await this.characterCollection.execute(req.user.id);
        res.status(200).send(characters);
    }
}