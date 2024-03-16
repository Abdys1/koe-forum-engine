import { fromCreateDto, toDetails } from "@src/components/character/character.mapper";
import { CharacterDao, CharacterDetailsCollection, CreateCharacterDto } from "@src/components/character/types";

class CharacterService {
    private characterDao: CharacterDao;

    constructor(characterDao: CharacterDao) {
        this.characterDao = characterDao;
    }

    public async getCharactersByUsername(username: string): Promise<CharacterDetailsCollection> {
        const characters = await this.characterDao.findAllCharacterByUsername(username);
        return characters.map(toDetails);
    }

    public async addNewCharacter(newCharacterDto: CreateCharacterDto): Promise<boolean> {
        const hasRegisteredCharName = await this.characterDao.existByCharacterName(newCharacterDto.charName);
        if (hasRegisteredCharName) {
            return false;
        }
        const characterEntity = fromCreateDto(newCharacterDto);
        await this.characterDao.save(characterEntity);
        return true;
    }
}

export default CharacterService;