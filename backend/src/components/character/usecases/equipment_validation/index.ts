import CharacterEquipmentValidationUseCaseImpl from "@src/components/character/usecases/equipment_validation/character-equipment-validation";
import { CharacterEquipmentValidationUseCase } from "@src/components/character/usecases/equipment_validation/types";
import { equipmentExistenceValidation, slotCapacityValidation } from "@src/components/equipment/usecases/validation";

const characterEquipmentValidation: CharacterEquipmentValidationUseCase = new CharacterEquipmentValidationUseCaseImpl(
    equipmentExistenceValidation,
    slotCapacityValidation
);

export { characterEquipmentValidation };
