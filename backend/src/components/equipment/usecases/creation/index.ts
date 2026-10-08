import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentCreationImpl from "@src/components/equipment/usecases/creation/equipment-creation";
import { EquipmentCreation } from "@src/components/equipment/usecases/creation/types";
import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import { slotRepository } from "@src/components/slot/repositories";

const equipmentCreation: EquipmentCreation = new EquipmentCreationImpl(equipmentRepository, equipmentTypeRepository, slotRepository);

export { equipmentCreation };
