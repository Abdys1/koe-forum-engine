import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

export default class InMemoryCharacterRepository implements CharacterRepository {
    public characters: CharacterEntity[];

    constructor() {
        this.characters = [];
    }

    public async findAllCharacterByUserId(userId: number): Promise<CharacterEntity[]> {
        return Promise.resolve(this.characters.filter(character => character.userId === userId));
    }

    public async existsByCharacterName(characterName: string): Promise<boolean> {
        return Promise.resolve(this.characters.some(character => character.name === characterName));
    }

    public async create(character: CharacterEntity): Promise<void> {
        this.characters.push({ ...character, id: this.characters.length + 1 });
    }
}
