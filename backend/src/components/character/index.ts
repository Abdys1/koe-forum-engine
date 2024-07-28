import CharacterController from "@src/components/character/character.controller";
import CharacterDaoImpl from "@src/components/character/character.dao";
import CharacterServiceImpl from "@src/components/character/character.service";

const characterDao = new CharacterDaoImpl();
const characterService = new CharacterServiceImpl(characterDao);
const characterController = new CharacterController(characterService);

export { characterController };