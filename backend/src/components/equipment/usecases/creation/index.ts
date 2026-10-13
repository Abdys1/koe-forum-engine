import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentCreationUseCaseImpl from "@src/components/equipment/usecases/creation/equipment-creation";
import { EquipmentCreationUseCase } from "@src/components/equipment/usecases/creation/types";
import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import { slotRepository } from "@src/components/slot/repositories";

const equipmentCreation: EquipmentCreationUseCase = new EquipmentCreationUseCaseImpl(equipmentRepository, equipmentTypeRepository, slotRepository);

export { equipmentCreation };
