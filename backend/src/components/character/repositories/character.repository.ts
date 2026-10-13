import { Character as CharacterRecord, PrismaClient } from "@prisma/client";
import Character from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";

function toCharacter(record: CharacterRecord): Character {
  return {
    id: record.id,
    userId: record.userId,
    name: record.name,
    race: record.race,
    sex: record.sex,
    imageUrl: record.imageUrl,
  };
}

export default class CharacterRepositoryImpl implements CharacterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async findById(id: number): Promise<Character | null> {
    const character = await this.db.character.findUnique({ where: { id } });
    return character ? toCharacter(character) : null;
  }

  public async findAllCharacterByUserId(
    userId: number,
  ): Promise<Character[]> {
    const characters = await this.db.character.findMany({
      where: { user: { id: userId } },
    });

    return characters.map(toCharacter);
  }

  public async existsByCharacterName(characterName: string): Promise<boolean> {
    const count = await this.db.character.count({
      where: { name: characterName },
    });
    return count > 0;
  }

  public async create(character: Character): Promise<Character> {
    const created = await this.db.character.create({
      data: {
        name: character.name,
        sex: character.sex,
        race: character.race,
        imageUrl: character.imageUrl,
        user: { connect: { id: character.userId } },
        equipment: {
          create: (character.equipmentIds ?? []).map((equipmentId) => ({ equipmentId })),
        },
      },
    });
    return toCharacter(created);
  }
}
