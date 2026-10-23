import { equipmentTypeRepositories } from "@src/components/equipment-type/repositories";
import EquipmentTypeCreationImpl from "@src/components/equipment-type/usecases/creation/equipment-type-creation";
import { EquipmentTypeCreation } from "@src/components/equipment-type/usecases/creation/types";
import { slotRepositories } from "@src/components/slot/repositories";

const equipmentTypeCreation: EquipmentTypeCreation = new EquipmentTypeCreationImpl(equipmentTypeRepositories, slotRepositories);

export { equipmentTypeCreation };
