import { CharacterDetailsResponseDto, CreateCharacterRequestDto } from "@src/components/character/types";
import { Request, Response } from "express";

class CharacterController {
    private characterList: CharacterDetailsResponseDto[];

    constructor() {
        this.characterList = [];
        this.createCharacter = this.createCharacter.bind(this);
        this.listCharacters = this.listCharacters.bind(this);
    }

    public createCharacter(req: Request, res: Response): void {
        const newCharacterDetails: CreateCharacterRequestDto = req.body;
        this.characterList.push({ ...newCharacterDetails });
        res.status(200).send();
    }

    public listCharacters(req: Request, res: Response): void {
        res.status(200).send(this.characterList);
    }
}

export default CharacterController;