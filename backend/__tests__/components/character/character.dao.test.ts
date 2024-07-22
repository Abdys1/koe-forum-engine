import { Character, CharacterDao, CharacterEntity, Sex } from "@src/components/character/types";
import CharacterModel from "@src/components/character/character.model";
import UserModel from "@src/components/user/user.model";
import { describe } from "vitest";
import { UserEntity } from "@src/components/user/types";
import { fromSchema as fromEntity } from "@src/components/character/character.mapper";
import { saveTestUserToDb } from "@test/utils/test-data-generator";

class CharacterDaoImpl implements CharacterDao {
    public async findAllCharacterByUsername(username: string): Promise<Character[]> {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return [];
        }
        const characterEntities = await CharacterModel.find({ userRef: user._id });
        return characterEntities.map((s) => fromEntity(username, s));
    }

    public async existByCharacterName(characterName: string): Promise<boolean> {
        return false;
    }

    public async save(character: Character): Promise<void> {
        //TODO
    }

}

async function saveCharactersToDb(user: UserEntity): Promise<Character[]> {
    const entities: CharacterEntity[] = [
        {
            name: 'Legolas',
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/legolas.jpg',
            userRef: user._id
        }
    ];
    await CharacterModel.create(entities);
    return entities.map(entity => fromEntity(user.username, entity));
}

describe('Character dao', () => {
    describe('findAllCharacterByUsername()', () => {
        let characterDao: CharacterDao;

        beforeEach(async () => {
            characterDao = new CharacterDaoImpl();
            await UserModel.deleteMany({});
            await CharacterModel.deleteMany({});
        });

        it('should return an empty array when not exists user', () => {
            expect(characterDao.findAllCharacterByUsername('not-exists')).resolves.toStrictEqual([]);
        });

        it('should return an empty array when not exists characters for user', async () => {
            const newUser = await saveTestUserToDb();
            expect(characterDao.findAllCharacterByUsername(newUser.username)).resolves.toStrictEqual([]);
        });

        it('should return characters for user', async () => {
            const user = await saveTestUserToDb();
            const characters = await saveCharactersToDb(user);
            expect(characterDao.findAllCharacterByUsername(user.username)).resolves.toStrictEqual(characters);
        });
    });
});