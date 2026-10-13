import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentRemovalUseCaseImpl from "@src/components/equipment/usecases/removal/equipment-removal";
import { EquipmentRemovalUseCase } from "@src/components/equipment/usecases/removal/types";

const equipmentRemoval: EquipmentRemovalUseCase = new EquipmentRemovalUseCaseImpl(equipmentRepository);

export { equipmentRemoval };
