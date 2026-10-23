import { equipmentRepositories } from "@src/components/equipment/repositories";

import EquipmentExistenceValidationUseCaseImpl from "./equipment-existence-validation";
import SlotCapacityValidationUseCaseImpl from "./slot-capacity-validation";
import { EquipmentExistenceValidationUseCase, SlotCapacityValidationUseCase } from "./types";

const equipmentExistenceValidation: EquipmentExistenceValidationUseCase = new EquipmentExistenceValidationUseCaseImpl(equipmentRepositories);
const slotCapacityValidation: SlotCapacityValidationUseCase = new SlotCapacityValidationUseCaseImpl(equipmentRepositories);

export { equipmentExistenceValidation, slotCapacityValidation };
