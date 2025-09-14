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
        helmet: character.helmetId != null
          ? { connect: { id: character.helmetId } }
          : undefined,
        primaryWeapon: character.primaryWeaponId != null
          ? { connect: { id: character.primaryWeaponId } }
          : undefined,
        secondaryWeapon: character.secondaryWeaponId != null
          ? { connect: { id: character.secondaryWeaponId } }
          : undefined,
        bodyArmor: character.bodyArmorId != null
          ? { connect: { id: character.bodyArmorId } }
          : undefined,
        secondaryArmor: character.secondaryArmorId != null
          ? { connect: { id: character.secondaryArmorId } }
          : undefined,
        shield: character.shieldId != null
          ? { connect: { id: character.shieldId } }
          : undefined,
        user: { connect: { id: character.userId } },
      },
    });
  }
}
