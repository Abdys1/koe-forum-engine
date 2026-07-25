import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import EquipmentTypeRemovalImpl from "@src/components/equipment-type/usecases/removal/equipment-type-removal";
import { EquipmentTypeRemoval } from "@src/components/equipment-type/usecases/removal/types";

const equipmentTypeRemoval: EquipmentTypeRemoval = new EquipmentTypeRemovalImpl(equipmentTypeRepository);

export { equipmentTypeRemoval };
