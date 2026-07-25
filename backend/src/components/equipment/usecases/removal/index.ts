import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentRemovalImpl from "@src/components/equipment/usecases/removal/equipment-removal";
import { EquipmentRemoval } from "@src/components/equipment/usecases/removal/types";

const equipmentRemoval: EquipmentRemoval = new EquipmentRemovalImpl(equipmentRepository);

export { equipmentRemoval };
