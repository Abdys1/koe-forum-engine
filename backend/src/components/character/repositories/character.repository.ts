import { PrismaClient } from "@prisma/client";
import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

export default class CharacterRepositoryImpl implements CharacterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async findAllCharacterByUserId(
    userId: number,
  ): Promise<CharacterEntity[]> {
    return this.db.character.findMany({ where: { user: { id: userId } } });
  }

  public async existsByCharacterName(characterName: string): Promise<boolean> {
    const count = await this.db.character.count({
      where: { name: characterName },
    });
    return count > 0;
  }

  public async create(character: CharacterEntity): Promise<void> {
    await this.db.character.create({
      data: {
        name: character.name,
        sex: character.sex,
        race: character.race,
        imageUrl: character.imageUrl,
        helmet: character.helmet
          ? { connect: { id: character.helmet } }
          : undefined,
        primaryWeapon: character.primaryWeapon
          ? { connect: { id: character.primaryWeapon } }
          : undefined,
        secondaryWeapon: character.secondaryWeapon
          ? { connect: { id: character.secondaryWeapon } }
          : undefined,
        bodyArmor: character.bodyArmor
          ? { connect: { id: character.bodyArmor } }
          : undefined,
        secondaryArmor: character.secondaryArmor
          ? { connect: { id: character.secondaryArmor } }
          : undefined,
        shield: character.shield
          ? { connect: { id: character.shield } }
          : undefined,
        user: { connect: { id: character.userId } },
      },
    });
  }
}
