import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import SlotController from "@src/components/slot/slot.controller";
import { slotCollection } from "@src/components/slot/usecases/collection";
import { slotCreation } from "@src/components/slot/usecases/creation";
import { slotRemoval } from "@src/components/slot/usecases/removal";
import { ErrorMessages } from "@src/messages";
import { body, param } from "express-validator";

const slotController = new SlotController(slotCollection, slotCreation, slotRemoval);

const labelValidation = body("label").trim().isLength({ min: 1, max: 128 }).withMessage(ErrorMessages.SLOT_LABEL_INVALID);
const maxCapacityValidation = body("maxCapacity").isInt({ min: 1 }).withMessage(ErrorMessages.SLOT_MAX_CAPACITY_INVALID);
const idValidation = param("id").isInt().withMessage(ErrorMessages.SLOT_NOT_EXISTS);

/**
 * @openapi
 * components:
 *   schemas:
 *     Slot:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         label:
 *           type: string
 *         maxCapacity:
 *           type: integer
 */

/**
 * @openapi
 * /equipment/slot:
 *   get:
 *     tags: [Slot]
 *     summary: List all slots
 *     responses:
 *       200:
 *         description: List of slots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slots:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Slot'
 *   post:
 *     tags: [Slot]
 *     summary: Create a slot (a shared equip-capacity pool that one or more equipment types can be assigned to)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [label, maxCapacity]
 *             properties:
 *               label:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 128
 *               maxCapacity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Slot created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Slot'
 *       409:
 *         description: A slot with this label already exists
 */

/**
 * @openapi
 * /equipment/slot/{id}:
 *   delete:
 *     tags: [Slot]
 *     summary: Delete a slot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Slot deleted
 *       404:
 *         description: Slot not found
 */
export default defineRouter([
    {
        path: '/',
        method: HttpMethod.GET,
        controller: slotController.getAll
    },
    {
        path: '/',
        method: HttpMethod.POST,
        middlewares: [labelValidation, maxCapacityValidation],
        controller: slotController.create
    },
    {
        path: '/:id',
        method: HttpMethod.DELETE,
        middlewares: [idValidation],
        controller: slotController.remove
    },
]);
