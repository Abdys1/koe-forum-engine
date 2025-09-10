import EquipmentController from "@src/components/equipment/equipment.controller";
import { equipmentCollection } from "@src/components/equipment/usecases/collection";
import { defineRouter } from "@src/components/routerconf";

const equipmentController = new EquipmentController(equipmentCollection);

export default defineRouter([
  {
    path: "/",
    method: "GET",
    public: true,
    controller: equipmentController.getAll,
  },
]);
