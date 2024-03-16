import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import { characterController } from "@src/components/character";

export default defineRouter([
    {
        path: '/',
        method: HttpMethod.POST,
        controller: (req, res) => characterController.createCharacter(req, res)
    },
    {
        path: '/',
        method: HttpMethod.GET,
        controller: (req, res) => characterController.listCharacters(req, res)
    },
]);