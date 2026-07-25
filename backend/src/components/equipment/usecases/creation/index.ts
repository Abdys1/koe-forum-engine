import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentCreationImpl from "@src/components/equipment/usecases/creation/equipment-creation";
import { EquipmentCreation } from "@src/components/equipment/usecases/creation/types";

const equipmentCreation: EquipmentCreation = new EquipmentCreationImpl(equipmentRepository);

export { equipmentCreation };
