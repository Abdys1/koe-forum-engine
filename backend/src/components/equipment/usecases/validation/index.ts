import { equipmentRepository } from "@src/components/equipment/repositories";

import EquipmentExistenceValidationImpl from "./equipment-existence-validation";
import SlotCapacityValidationImpl from "./slot-capacity-validation";
import { EquipmentExistenceValidation, SlotCapacityValidation } from "./types";

const equipmentExistenceValidation: EquipmentExistenceValidation = new EquipmentExistenceValidationImpl(equipmentRepository);
const slotCapacityValidation: SlotCapacityValidation = new SlotCapacityValidationImpl(equipmentRepository);

export { equipmentExistenceValidation, slotCapacityValidation };
