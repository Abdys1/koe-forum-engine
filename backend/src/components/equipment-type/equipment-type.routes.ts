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

const idValidation = param('id').isInt().withMessage(ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS);

export default defineRouter([
    {
        path: '/',
        method: HttpMethod.GET,
        controller: equipmentTypeController.getAll
    },
    {
        path: '/',
        method: HttpMethod.POST,
        middlewares: [labelValidation],
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
