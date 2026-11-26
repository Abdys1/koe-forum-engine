import { HttpMethod, RouterConfig } from "@src/components/routerconf/router-config";
import { Cradle } from "@src/container";

/**
 * @openapi
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       required: [id, name, teaser, description, imageUrl, buttonImageUrl]
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         teaser:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *         buttonImageUrl:
 *           type: string
 */

/**
 * @openapi
 * /races:
 *   get:
 *     tags: [Race]
 *     summary: List the races a character can be created with, in display order
 *     responses:
 *       200:
 *         description: List of races
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [races]
 *               properties:
 *                 races:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Race'
 */
export const raceRoutes = ({ raceController }: Pick<Cradle, 'raceController'>): RouterConfig[] => [
    {
        path: '/',
        method: HttpMethod.GET,
        controller: raceController.getAll
    },
];
