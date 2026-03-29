import { equipmentRepository } from "@src/components/equipment/repositories";

import EquipmentValidationServiceImpl from "./equipment-validation.service.impl";

const equipmentValidationService = new EquipmentValidationServiceImpl(equipmentRepository);

export { equipmentValidationService };
