import { equipmentRepositories } from "@src/components/equipment/repositories";
import EquipmentCreationUseCaseImpl from "@src/components/equipment/usecases/creation/equipment-creation";
import { EquipmentCreationUseCase } from "@src/components/equipment/usecases/creation/types";
import { equipmentTypeRepositories } from "@src/components/equipment-type/repositories";
import { slotRepositories } from "@src/components/slot/repositories";

const equipmentCreation: EquipmentCreationUseCase = new EquipmentCreationUseCaseImpl(equipmentRepositories, equipmentTypeRepositories, slotRepositories);

export { equipmentCreation };
