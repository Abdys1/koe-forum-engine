import { equipmentRepository } from "@src/components/equipment/repositories";

import EquipmentExistenceValidationImpl from "./equipment-existence-validation";
import { EquipmentExistenceValidation } from "./types";

const equipmentExistenceValidation: EquipmentExistenceValidation = new EquipmentExistenceValidationImpl(equipmentRepository);

export { equipmentExistenceValidation };
