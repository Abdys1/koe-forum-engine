import CharacterController from "@src/components/character/character.controller";
import { Sex } from "@src/components/character/types";
import { characterCollection } from "@src/components/character/usecases/collection";
import { characterRegistration } from "@src/components/character/usecases/registration";
import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import { ErrorMessages } from "@src/messages";
import { body } from "express-validator";

const characterController = new CharacterController(characterRegistration, characterCollection);

export default defineRouter([
    {
        path: '/',
        method: HttpMethod.POST,
        middlewares: [
            body('name').isLength({ min: 3, max: 64 }).withMessage(ErrorMessages.CHARACTER_NAME_INVALID_LENGTH)
                .matches(/^[a-zA-ZaäáeëéiíoóöőuúüűAÄÁEÉËIÍOÓÖŐUÚÜŰ\s']*$/).withMessage(ErrorMessages.CHARACTER_NAME_INVALID_LETTERS),
            body('sex').isIn(Object.values(Sex)).withMessage(ErrorMessages.CHARACTER_SEX_INVALID),
            body('race').notEmpty().withMessage(ErrorMessages.CHARACTER_RACE_REQUIRED),
            body('imageUrl').notEmpty().withMessage(ErrorMessages.CHARACTER_IMAGE_URL_REQUIRED)
        ],
        controller: characterController.createCharacter
    },
    {
        path: '/',
        method: HttpMethod.GET,
        controller: characterController.listCharacters
    },
]);