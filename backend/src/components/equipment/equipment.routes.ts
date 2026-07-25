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
