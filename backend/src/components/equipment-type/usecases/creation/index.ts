import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import EquipmentTypeCreationImpl from "@src/components/equipment-type/usecases/creation/equipment-type-creation";
import { EquipmentTypeCreation } from "@src/components/equipment-type/usecases/creation/types";

const equipmentTypeCreation: EquipmentTypeCreation = new EquipmentTypeCreationImpl(equipmentTypeRepository);

export { equipmentTypeCreation };
