import { fromRequestDto, toDetails } from "@src/components/character/character-dto.mapper";
import { CharacterService, CreateCharacterRequestDto } from "@src/components/character/types";
import { Request, Response } from "express";

class CharacterController {
    private characterService: CharacterService;

    constructor(characterService: CharacterService) {
        this.characterService = characterService;
        this.createCharacter = this.createCharacter.bind(this);
        this.listCharacters = this.listCharacters.bind(this);
    }

    public async createCharacter(req: Request, res: Response): Promise<void> {
        const createCharRequestDto: CreateCharacterRequestDto = req.body;
        await this.characterService.createCharacter(fromRequestDto(req.user.username, createCharRequestDto));
        res.status(200).send();
    }

    public async listCharacters(req: Request, res: Response): Promise<void> {
        const characters = await this.characterService.getCharactersByUsername(req.user.username);
        const detailsCollection = characters.map(toDetails);
        res.status(200).send(detailsCollection);
    }
}

export default CharacterController;