import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import EquipmentTypeModificationImpl from "@src/components/equipment-type/usecases/modification/equipment-type-modification";
import { EquipmentTypeModification } from "@src/components/equipment-type/usecases/modification/types";

const equipmentTypeModification: EquipmentTypeModification = new EquipmentTypeModificationImpl(equipmentTypeRepository);

export { equipmentTypeModification };
