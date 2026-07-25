import EquipmentController from "@src/components/equipment/equipment.controller";
import { equipmentCollection } from "@src/components/equipment/usecases/collection";
import { equipmentCreation } from "@src/components/equipment/usecases/creation";
import { equipmentModification } from "@src/components/equipment/usecases/modification";
import { equipmentRemoval } from "@src/components/equipment/usecases/removal";
import { defineRouter } from "@src/components/routerconf";
import { HttpMethod } from "@src/components/routerconf/router-config";
import { ErrorMessages } from "@src/messages";
import { body, param } from "express-validator";

const equipmentController = new EquipmentController(
  equipmentCollection,
  equipmentCreation,
  equipmentModification,
  equipmentRemoval
);

const writeValidations = [
  body("name").trim().isLength({ min: 1, max: 255 }).withMessage(ErrorMessages.EQUIPMENT_NAME_INVALID),
  body("typeId").isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_ID_INVALID),
  body("description").trim().notEmpty().withMessage(ErrorMessages.EQUIPMENT_DESCRIPTION_REQUIRED),
];

const idValidation = param("id").isInt().withMessage(ErrorMessages.EQUIPMENT_NOT_EXISTS);

/**
 * @openapi
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           $ref: '#/components/schemas/EquipmentType'
 */

/**
 * @openapi
 * /equipment:
 *   get:
 *     tags: [Equipment]
 *     summary: List all equipment
 *     security: []
 *     responses:
 *       200:
 *         description: List of equipment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 equipments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Equipment'
 *   post:
 *     tags: [Equipment]
 *     summary: Create a new piece of equipment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, typeId, description]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               typeId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Equipment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: The referenced equipment type does not exist
 *       409:
 *         description: Equipment with this name already exists
 */

/**
 * @openapi
 * /equipment/{id}:
 *   put:
 *     tags: [Equipment]
 *     summary: Update an existing piece of equipment
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
 *             required: [name, typeId, description]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               typeId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Equipment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       400:
 *         description: The referenced equipment type does not exist
 *       404:
 *         description: Equipment not found
 *       409:
 *         description: Equipment with this name already exists
 *   delete:
 *     tags: [Equipment]
 *     summary: Delete a piece of equipment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Equipment deleted
 *       404:
 *         description: Equipment not found
 *       409:
 *         description: Equipment is still assigned to a character and cannot be deleted
 */
export default defineRouter([
  {
    path: "/",
    method: HttpMethod.GET,
    public: true,
    controller: equipmentController.getAll,
  },
  {
    path: "/",
    method: HttpMethod.POST,
    middlewares: writeValidations,
    controller: equipmentController.create,
  },
  {
    path: "/:id",
    method: HttpMethod.PUT,
    middlewares: [idValidation, ...writeValidations],
    controller: equipmentController.update,
  },
  {
    path: "/:id",
    method: HttpMethod.DELETE,
    middlewares: [idValidation],
    controller: equipmentController.remove,
  },
]);
