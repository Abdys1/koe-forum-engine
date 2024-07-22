import CharacterController from "@src/components/character/character.controller";
import CharacterServiceImpl from "@src/components/character/character.service";
import FakeCharacterDao from "@src/components/character/fake-character.dao";

const characterDao = new FakeCharacterDao();
const characterService = new CharacterServiceImpl(characterDao);
const characterController = new CharacterController(characterService);

export { characterController };