import CharacterController from "@src/components/character/character.controller";
import { Sex } from "@src/components/character/types";
import { characterCollection } from "@src/components/character/usecases/collection";
import { characterRegistration } from "@src/components/character/usecases/registration";
import { characterUpdateValidator } from "@src/components/character/usecases/update_validator";
import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import { ErrorMessages } from "@src/messages";
import { body } from "express-validator";

const characterController = new CharacterController(characterRegistration, characterCollection, characterUpdateValidator);

/**
 * @openapi
 * components:
 *   schemas:
 *     CharacterEquipment:
 *       allOf:
 *         - $ref: '#/components/schemas/Equipment'
 *         - type: object
 *           properties:
 *             assignmentId:
 *               type: integer
 *     Character:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         sex:
 *           type: integer
 *           enum: [1, 2]
 *           description: 1 = male, 2 = female (ISO/IEC 5218)
 *         race:
 *           type: string
 *         imageUrl:
 *           type: string
 *         equipment:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CharacterEquipment'
 */

/**
 * @openapi
 * /characters:
 *   get:
 *     tags: [Character]
 *     summary: List the current user's characters
 *     responses:
 *       200:
 *         description: List of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *   post:
 *     tags: [Character]
 *     summary: Create a new character for the current user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, sex, race, imageUrl]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 64
 *                 description: Letters, spaces and apostrophes only
 *               sex:
 *                 type: integer
 *                 enum: [1, 2]
 *               race:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               equipmentIds:
 *                 type: array
 *                 maxItems: 100
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Character created
 *       409:
 *         description: A character with this name already exists
 *       422:
 *         description: One of the referenced equipment ids does not exist, or the equipment list exceeds a slot's capacity
 */
export default defineRouter([
    {
        path: '/',
        method: HttpMethod.POST,
        middlewares: [
            body('name').isLength({ min: 3, max: 64 }).withMessage(ErrorMessages.CHARACTER_NAME_INVALID_LENGTH)
                .matches(/^[a-zA-ZaäáeëéiíoóöőuúüűAÄÁEÉËIÍOÓÖŐUÚÜŰ\s']*$/).withMessage(ErrorMessages.CHARACTER_NAME_INVALID_LETTERS),
            body('sex').isIn(Object.values(Sex)).withMessage(ErrorMessages.CHARACTER_SEX_INVALID),
            body('race').notEmpty().withMessage(ErrorMessages.CHARACTER_RACE_REQUIRED),
            body('imageUrl').notEmpty().withMessage(ErrorMessages.CHARACTER_IMAGE_URL_REQUIRED),
            body('equipmentIds').optional().isArray({ max: 100 }).withMessage(ErrorMessages.CHARACTER_EQUIPMENT_IDS_INVALID),
            body('equipmentIds.*').isInt().withMessage(ErrorMessages.CHARACTER_EQUIPMENT_ID_INVALID)
        ],
        controller: characterController.createCharacter
    },
    {
        path: '/',
        method: HttpMethod.GET,
        controller: characterController.listCharacters
    },
]);