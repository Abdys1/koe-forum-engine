import { PrismaClient } from "@prisma/client";
import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

export default class CharacterRepositoryImpl implements CharacterRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async findAllCharacterByUsername(username: string): Promise<CharacterEntity[]> {
        return this.db.character.findMany({ where: { user: { username } } });
    }

    public async existsByCharacterName(characterName: string): Promise<boolean> {
        const count = await this.db.character.count({ where: { name: characterName } });
        return count > 0;
    }

    public async save(character: CharacterEntity): Promise<void> {
        await this.db.character.create({
            data: {
                name: character.name,
                sex: character.sex,
                race: character.race,
                imageUrl: character.imageUrl,
                user: { connect: { id: character.userId } }
            }
        });
    }
}