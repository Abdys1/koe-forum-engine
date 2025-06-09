import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

export default class InMemoryCharacterRepository implements CharacterRepository {
    public characters: CharacterEntity[];

    constructor() {
        this.characters = [];
    }

    public async findAllCharacterByUsername(username: string): Promise<CharacterEntity[]> {
        return Promise.resolve(this.characters.filter(character => character.name === username));
    }

    public async existsByCharacterName(characterName: string): Promise<boolean> {
        return Promise.resolve(this.characters.some(character => character.name === characterName));
    }

    public async create(character: CharacterEntity): Promise<void> {
        this.characters.push({ ...character, id: this.characters.length + 1 });
    }
}
