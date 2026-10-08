import { PrismaClient } from "@prisma/client";
import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

const ASSIGNMENTS = {
  select: {
    id: true,
    equipment: {
      select: {
        id: true,
        name: true,
        typeId: true,
        description: true,
        slotCost: true,
        type: { select: { id: true, label: true } }
      }
    }
  },
  orderBy: { id: "asc" }
} as const;

export default class CharacterRepositoryImpl implements CharacterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async findAllCharacterByUserId(
    userId: number,
  ): Promise<CharacterEntity[]> {
    const characters = await this.db.character.findMany({
      where: { user: { id: userId } },
      include: { equipment: ASSIGNMENTS },
    });

    return characters.map((character) => ({
      id: character.id,
      userId: character.userId,
      name: character.name,
      race: character.race,
      sex: character.sex,
      imageUrl: character.imageUrl,
      equipmentIds: character.equipment.map((assignment) => assignment.equipment.id),
      equipment: character.equipment.map((assignment) => ({
        assignmentId: assignment.id,
        equipment: assignment.equipment,
      })),
    }));
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
        user: { connect: { id: character.userId } },
        equipment: {
          create: character.equipmentIds.map((equipmentId) => ({ equipmentId })),
        },
      },
    });
  }
}
