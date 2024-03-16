import { Character, CharacterDao } from "@src/components/character/types";

class FakeCharacterDao implements CharacterDao {
    private characters: Map<string, Character[]>;

    constructor() {
        this.characters = new Map<string, Character[]>();
    }
    
    public async findAllCharacterByUsername(username: string): Promise<Character[]> {
        return Promise.resolve(this.characters.get(username) || []);
    }

    public async existByCharacterName(name: string): Promise<boolean> {
        for(const characterValues of this.characters.values()) {
            if (characterValues.some(character => character.name === name)) {
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }

    public async save(character: Character): Promise<void> {
        this.addCharacters(character.owner, [character]);
    }

    public addCharacters(username: string, newCharacters: Character[]): Character[] {
        const charList = this.characters.get(username);
        if (charList) {
            charList.push(...newCharacters);
            return charList;
        } else {
            this.characters.set(username, newCharacters);
            return newCharacters;
        }
    }
}

export default FakeCharacterDao;