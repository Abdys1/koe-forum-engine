import { fromCreateDto, toDetails } from "@src/components/character/character.mapper";
import { CharacterDao, CharacterDetailsCollection, CharacterService, CreateCharacterDto } from "@src/components/character/types";

class CharacterServiceImpl implements CharacterService {
    private characterDao: CharacterDao;

    constructor(characterDao: CharacterDao) {
        this.characterDao = characterDao;
    }

    public async getCharactersByUsername(username: string): Promise<CharacterDetailsCollection> {
        const characters = await this.characterDao.findAllCharacterByUsername(username);
        return characters.map(toDetails);
    }

    public async createCharacter(newCharacterDto: CreateCharacterDto): Promise<boolean> {
        const hasRegisteredCharName = await this.characterDao.existByCharacterName(newCharacterDto.name);
        if (hasRegisteredCharName) {
            return false;
        }
        const character = fromCreateDto(newCharacterDto);
        await this.characterDao.save(character);
        return true;
    }
}

export default CharacterServiceImpl;