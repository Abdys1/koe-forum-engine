import { Character, CharacterDao } from "@src/components/character/types";
import { fromEntity } from '@src/components/character/character.mapper'
import { UserModel } from "@src/components/user/user.model";
import { CharacterModel } from "@src/components/character/character.model";
import UserNotFoundError from "@src/components/user/user-not-found.error";

export default class CharacterDaoImpl implements CharacterDao {
    public async findAllCharacterByUsername(username: string): Promise<Character[]> {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return [];
        }
        const characterEntities = await CharacterModel.find({ userRef: user._id });
        return characterEntities.map((s) => fromEntity(username, s));
    }

    public async existsByCharacterName(characterName: string): Promise<boolean> {
        return !!(await CharacterModel.exists({ name: characterName }));
    }

    public async save(character: Character): Promise<void> {
        const user = await UserModel.findOne({ username: character.owner });
        if (!user) {
            throw new UserNotFoundError('User with username ' + character.owner + ' not found!');
        }
        await CharacterModel.create({
            name: character.name,
            sex: character.sex,
            race: character.race,
            imageUrl: character.imageUrl,
            userRef: user._id
        });
    }

}