import CharacterController from "@src/components/character/character.controller";
import { characterCollection } from "@src/components/character/usecases/collection";
import { characterRegistration } from "@src/components/character/usecases/registration";
import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";

const characterController = new CharacterController(characterRegistration, characterCollection);

export default defineRouter([
    {
        path: '/',
        method: HttpMethod.POST,
        controller: characterController.createCharacter
    },
    {
        path: '/',
        method: HttpMethod.GET,
        controller: characterController.listCharacters
    },
]);