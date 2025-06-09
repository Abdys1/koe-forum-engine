import { PrismaClient } from "@prisma/client";
import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

export default class CharacterRepositoryImpl implements CharacterRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async findAllCharacterByUserId(userId: number): Promise<CharacterEntity[]> {
        return this.db.character.findMany({ where: { user: { id: userId } } });
    }

    public async existsByCharacterName(characterName: string): Promise<boolean> {
        const count = await this.db.character.count({ where: { name: characterName } });
        return count > 0;
    }

    public async create(character: CharacterEntity): Promise<void> {
        await this.db.character.create({
            data: {
                name: character.name,
                sex: character.sex,
                race: character.race,
                imageUrl: character.imageUrl,
                helmet: character.helmet,
                primaryWeapon: character.primaryWeapon,
                secondaryWeapon: character.secondaryWeapon,
                bodyArmor: character.bodyArmor,
                secondaryArmor: character.secondaryArmor,
                shield: character.shield,
                user: { connect: { id: character.userId } }
            }
        });
    }
}