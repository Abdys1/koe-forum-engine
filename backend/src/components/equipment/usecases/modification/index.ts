import { equipmentRepositories } from "@src/components/equipment/repositories";
import EquipmentModificationUseCaseImpl from "@src/components/equipment/usecases/modification/equipment-modification";
import { EquipmentModificationUseCase } from "@src/components/equipment/usecases/modification/types";

const equipmentModification: EquipmentModificationUseCase = new EquipmentModificationUseCaseImpl(equipmentRepositories);

export { equipmentModification };
