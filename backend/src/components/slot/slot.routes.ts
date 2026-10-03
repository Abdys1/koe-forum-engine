import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import SlotController from "@src/components/slot/slot.controller";
import { slotCollection } from "@src/components/slot/usecases/collection";
import { slotCreation } from "@src/components/slot/usecases/creation";
import { slotRemoval } from "@src/components/slot/usecases/removal";
import { ErrorMessages } from "@src/messages";
import { body, param } from "express-validator";

const slotController = new SlotController(slotCollection, slotCreation, slotRemoval);

const equipmentTypeIdValidation = body("equipmentTypeId").isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_ID_INVALID);
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
 *         equipmentTypeId:
 *           type: integer
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
 *     summary: Create a slot for an equipment type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipmentTypeId, maxCapacity]
 *             properties:
 *               equipmentTypeId:
 *                 type: integer
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
 *       400:
 *         description: The referenced equipment type does not exist
 *       409:
 *         description: The referenced equipment type already has a slot
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
        middlewares: [equipmentTypeIdValidation, maxCapacityValidation],
        controller: slotController.create
    },
    {
        path: '/:id',
        method: HttpMethod.DELETE,
        middlewares: [idValidation],
        controller: slotController.remove
    },
]);
