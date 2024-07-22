import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import { characterController } from "@src/components/character";
import asyncHandler from "@src/utils/async-handler";

export default defineRouter([
    {
        path: '/',
        method: HttpMethod.POST,
        controller: asyncHandler(characterController.createCharacter)
    },
    {
        path: '/',
        method: HttpMethod.GET,
        controller: asyncHandler(characterController.listCharacters)
    },
]);