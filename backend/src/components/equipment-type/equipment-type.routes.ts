import EquipmentTypeController from "@src/components/equipment-type/equipment-type.controller";
import { equipmentTypeCollection } from "@src/components/equipment-type/usecases/collection";
import { equipmentTypeCreation } from "@src/components/equipment-type/usecases/creation";
import { equipmentTypeModification } from "@src/components/equipment-type/usecases/modification";
import { equipmentTypeRemoval } from "@src/components/equipment-type/usecases/removal";
import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import { ErrorMessages } from "@src/messages";
import { body, param } from "express-validator";

const equipmentTypeController = new EquipmentTypeController(
    equipmentTypeCollection,
    equipmentTypeCreation,
    equipmentTypeModification,
    equipmentTypeRemoval
);

const labelValidation = body('label').trim().isLength({ min: 1, max: 128 })
    .withMessage(ErrorMessages.EQUIPMENT_TYPE_LABEL_INVALID);

const slotIdValidation = body('slotId').optional().isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_SLOT_ID_INVALID);

const idValidation = param('id').isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS);

/**
 * @openapi
 * components:
 *   schemas:
 *     EquipmentType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         label:
 *           type: string
 *         slotId:
 *           type: integer
 *           nullable: true
 */

/**
 * @openapi
 * /equipment/type:
 *   get:
 *     tags: [EquipmentType]
 *     summary: List all equipment types
 *     responses:
 *       200:
 *         description: List of equipment types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 equipmentTypes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EquipmentType'
 *   post:
 *     tags: [EquipmentType]
 *     summary: Create a new equipment type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [label]
 *             properties:
 *               label:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 128
 *               slotId:
 *                 type: integer
 *                 description: Optional — assigns this type to an existing Slot (several types may share the same Slot)
 *     responses:
 *       201:
 *         description: Equipment type created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentType'
 *       409:
 *         description: An equipment type with this label already exists
 *       422:
 *         description: The referenced slotId does not exist
 */

/**
 * @openapi
 * /equipment/type/{id}:
 *   put:
 *     tags: [EquipmentType]
 *     summary: Rename an existing equipment type
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
 *             required: [label]
 *             properties:
 *               label:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 128
 *     responses:
 *       200:
 *         description: Equipment type updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EquipmentType'
 *       404:
 *         description: Equipment type not found
 *       409:
 *         description: An equipment type with this label already exists
 *   delete:
 *     tags: [EquipmentType]
 *     summary: Delete an equipment type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Equipment type deleted
 *       404:
 *         description: Equipment type not found
 *       409:
 *         description: Equipment type is still in use and cannot be deleted
 */
export default defineRouter([
    {
        path: '/',
        method: HttpMethod.GET,
        controller: equipmentTypeController.getAll
    },
    {
        path: '/',
        method: HttpMethod.POST,
        middlewares: [labelValidation, slotIdValidation],
        controller: equipmentTypeController.create
    },
    {
        path: '/:id',
        method: HttpMethod.PUT,
        middlewares: [idValidation, labelValidation],
        controller: equipmentTypeController.update
    },
    {
        path: '/:id',
        method: HttpMethod.DELETE,
        middlewares: [idValidation],
        controller: equipmentTypeController.remove
    },
]);
