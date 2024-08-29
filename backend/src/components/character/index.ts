import CharacterController from "@src/components/character/character.controller";
import CharacterDaoImpl from "@src/components/character/character.dao";
import CharacterServiceImpl from "@src/components/character/character.service";
import { db } from "@src/prisma-client";

const characterDao = new CharacterDaoImpl(db);
const characterService = new CharacterServiceImpl(characterDao);
const characterController = new CharacterController(characterService);

export { characterController };