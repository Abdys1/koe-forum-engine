import CharacterRepositoryImpl from "@src/components/character/repositories/character.repository";
import { db } from '@src/prisma-client';

const characterRepository = new CharacterRepositoryImpl(db);

export { characterRepository };