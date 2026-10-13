import { equipmentRepository } from "@src/components/equipment/repositories";

import EquipmentExistenceValidationUseCaseImpl from "./equipment-existence-validation";
import SlotCapacityValidationUseCaseImpl from "./slot-capacity-validation";
import { EquipmentExistenceValidationUseCase, SlotCapacityValidationUseCase } from "./types";

const equipmentExistenceValidation: EquipmentExistenceValidationUseCase = new EquipmentExistenceValidationUseCaseImpl(equipmentRepository);
const slotCapacityValidation: SlotCapacityValidationUseCase = new SlotCapacityValidationUseCaseImpl(equipmentRepository);

export { equipmentExistenceValidation, slotCapacityValidation };
