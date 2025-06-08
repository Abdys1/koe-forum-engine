import { fromRequestDto } from "@src/components/character/character-dto.mapper";
import { CharacterCollection } from "@src/components/character/usecases/collection/types";
import { CharacterRegistration, CreateCharacterInput, CreateCharacterStatus } from "@src/components/character/usecases/registration/types";
import { Request, Response } from "express";

export default class CharacterController {
    private characterRegistration: CharacterRegistration;
    private characterCollection: CharacterCollection;

    constructor(characterRegistration: CharacterRegistration, characterCollection: CharacterCollection) {
        this.characterRegistration = characterRegistration;
        this.characterCollection = characterCollection;
    }

    createCharacter = async (req: Request, res: Response): Promise<void> => {
        const createCharInput: CreateCharacterInput = fromRequestDto(req.user, req.body);
        const { status } = await this.characterRegistration.execute(createCharInput);
        if (status === CreateCharacterStatus.ALREADY_EXISTS) {
            res.status(409).json({ errorCode: status }).send();
            return;
        }
        res.status(200).send();
    }

    listCharacters = async (req: Request, res: Response): Promise<void> => {
        const characters = await this.characterCollection.execute(req.user.username);
        res.status(200).send(characters);
    }
}