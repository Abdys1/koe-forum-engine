import { HttpMethod, RouterConfig } from "@src/components/routerconf/router-config";
import { Cradle } from "@src/container";
import { ErrorMessages } from "@src/messages";
import { body, param } from "express-validator";

const labelValidation = body('label').trim().isLength({ min: 1, max: 128 })
    .withMessage(ErrorMessages.EQUIPMENT_TYPE_LABEL_INVALID);

const slotIdValidation = body('slotId').optional().isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_SLOT_ID_INVALID);

const parentIdValidation = body('parentId').optional().isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_PARENT_ID_INVALID);

const iconValidation = body('icon').optional().isString().trim().isLength({ max: 32 })
    .withMessage(ErrorMessages.EQUIPMENT_TYPE_ICON_INVALID);

const sortOrderValidation = body('sortOrder').optional().isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_SORT_ORDER_INVALID);

const idValidation = param('id').isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS);

/**
 * @openapi
 * components:
 *   schemas:
 *     EquipmentType:
 *       type: object
 *       required: [id, label, slotId, parentId, icon, sortOrder]
 *       properties:
 *         id:
 *           type: integer
 *         label:
 *           type: string
 *         slotId:
 *           type: integer
 *           nullable: true
 *         parentId:
 *           type: integer
 *           nullable: true
 *           description: The parent type; null for a root type (category)
 *         icon:
 *           type: string
 *           nullable: true
 *         sortOrder:
 *           type: integer
 */

/**
 * @openapi
 * /equipment/type:
 *   get:
 *     tags: [EquipmentType]
 *     summary: List all equipment types (flat list ordered by sortOrder, then label; the tree is built from parentId)
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
 *               parentId:
 *                 type: integer
 *                 description: Optional — places this type under an existing type; omitted for a root type (category)
 *               icon:
 *                 type: string
 *                 maxLength: 32
 *               sortOrder:
 *                 type: integer
 *                 default: 0
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
 *         description: The referenced slotId or parentId does not exist
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
 *         description: Equipment type is still in use or has child types and cannot be deleted
 */
export const equipmentTypeRoutes = ({ equipmentTypeController }: Pick<Cradle, 'equipmentTypeController'>): RouterConfig[] => [
    {
        path: '/',
        method: HttpMethod.GET,
        controller: equipmentTypeController.getAll
    },
    {
        path: '/',
        method: HttpMethod.POST,
        middlewares: [labelValidation, slotIdValidation, parentIdValidation, iconValidation, sortOrderValidation],
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
];
