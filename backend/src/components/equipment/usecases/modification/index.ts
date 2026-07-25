import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentModificationImpl from "@src/components/equipment/usecases/modification/equipment-modification";
import { EquipmentModification } from "@src/components/equipment/usecases/modification/types";

const equipmentModification: EquipmentModification = new EquipmentModificationImpl(equipmentRepository);

export { equipmentModification };
