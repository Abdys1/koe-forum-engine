import { HttpMethod, RouterConfig } from "@src/components/routerconf/router-config";
import { Cradle } from "@src/container";
import { ErrorMessages } from "@src/messages";
import { body } from "express-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     CurrentUser:
 *       type: object
 *       required: [id, username, activeCharacterId]
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         activeCharacterId:
 *           type: integer
 *           nullable: true
 *           description: The character the user selected last, null if none is selected
 */

/**
 * @openapi
 * /users/me:
 *   get:
 *     tags: [User]
 *     summary: Get the current user
 *     responses:
 *       200:
 *         description: The current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUser'
 *       404:
 *         description: The user does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorCode'
 * /users/me/active-character:
 *   put:
 *     tags: [User]
 *     summary: Select the active character of the current user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [characterId]
 *             properties:
 *               characterId:
 *                 type: integer
 *     responses:
 *       204:
 *         description: The character is selected
 *       400:
 *         description: The character id is not an integer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrors'
 *       403:
 *         description: The character belongs to another user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorCode'
 *       404:
 *         description: The character does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorCode'
 */
export const userRoutes = ({ userController }: Pick<Cradle, 'userController'>): RouterConfig[] => [
    {
        path: '/me',
        method: HttpMethod.GET,
        controller: userController.getCurrentUser
    },
    {
        path: '/me/active-character',
        method: HttpMethod.PUT,
        middlewares: [
            body('characterId').isInt().withMessage(ErrorMessages.CHARACTER_ID_INVALID).toInt()
        ],
        controller: userController.setActiveCharacter
    },
];
