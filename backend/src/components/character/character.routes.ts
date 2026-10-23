import { Sex } from "@src/components/character/types";
import { HttpMethod, RouterConfig } from "@src/components/routerconf/router-config";
import { Cradle } from "@src/container";
import { ErrorMessages } from "@src/messages";
import { body, param } from "express-validator";

const idValidation = param('id').isInt().withMessage(ErrorMessages.CHARACTER_NOT_EXISTS);

/**
 * @openapi
 * components:
 *   schemas:
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
 *                 description: The initial equipment list; an id may be repeated to assign the same equipment multiple times
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Character created
 *       409:
 *         description: A character with this name already exists
 *       422:
 *         description: One of the referenced equipment ids does not exist, or the equipment list exceeds a slot's capacity
 * /characters/{id}/equipment:
 *   get:
 *     tags: [Character]
 *     summary: List the equipment of any character
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipment of the character with its type; an equipment assigned multiple times is listed multiple times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: The id is not an integer
 *       404:
 *         description: The character does not exist
 *   put:
 *     tags: [Character]
 *     summary: Replace the whole equipment list of one of the current user's characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipmentIds]
 *             properties:
 *               equipmentIds:
 *                 type: array
 *                 maxItems: 100
 *                 description: The new equipment list; an id may be repeated to assign the same equipment multiple times, an empty list removes every equipment
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: The new equipment list of the character
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: The id is not an integer, or the equipment id list is invalid
 *       403:
 *         description: The character belongs to another user
 *       404:
 *         description: The character does not exist
 *       422:
 *         description: One of the referenced equipment ids does not exist, or the equipment list exceeds a slot's capacity
 */
export const characterRoutes = ({ characterController }: Pick<Cradle, 'characterController'>): RouterConfig[] => [
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
            body('equipmentIds.*').isInt().withMessage(ErrorMessages.CHARACTER_EQUIPMENT_ID_INVALID).toInt()
        ],
        controller: characterController.createCharacter
    },
    {
        path: '/',
        method: HttpMethod.GET,
        controller: characterController.listCharacters
    },
    {
        path: '/:id/equipment',
        method: HttpMethod.GET,
        middlewares: [idValidation],
        controller: characterController.listCharacterEquipment
    },
    {
        path: '/:id/equipment',
        method: HttpMethod.PUT,
        middlewares: [
            idValidation,
            body('equipmentIds').isArray({ max: 100 }).withMessage(ErrorMessages.CHARACTER_EQUIPMENT_IDS_INVALID),
            body('equipmentIds.*').isInt().withMessage(ErrorMessages.CHARACTER_EQUIPMENT_ID_INVALID).toInt()
        ],
        controller: characterController.setCharacterEquipment
    },
];
