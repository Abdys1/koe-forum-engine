import { Character, CharacterDao, CharacterEntity } from "@src/components/character/types";
import { fromEntity } from '@src/components/character/character.mapper'
import { PrismaClient } from "@prisma/client";

export default class CharacterDaoImpl implements CharacterDao {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async findAllCharacterByUsername(username: string): Promise<Character[]> {
        const characterEntities: CharacterEntity[] = await this.db.character.findMany({ where: { user: { username } } });
        return characterEntities.map((s) => fromEntity(username, s));
    }

    public async existsByCharacterName(characterName: string): Promise<boolean> {
        const count = await this.db.character.count({ where: { name: characterName } });
        return count > 0;
    }

    public async save(character: Character): Promise<void> {
        await this.db.character.create({
            data: {
                name: character.name,
                sex: character.sex,
                race: character.race,
                imageUrl: character.imageUrl,
                user: { connect: { username: character.owner } }
            }
        });
    }
}