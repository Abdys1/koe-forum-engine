import { characterRepository } from "@src/components/character/repositories";
import { equipmentExistenceValidation, slotCapacityValidation } from "@src/components/equipment/usecases/validation";

import CharacterUpdateValidatorUseCaseImpl from "./character-update-validator";

const characterUpdateValidator = new CharacterUpdateValidatorUseCaseImpl(characterRepository, equipmentExistenceValidation, slotCapacityValidation);

export { characterUpdateValidator };
