import { characterRepository } from "@src/components/character/repositories";
import { equipmentExistenceValidation } from "@src/components/equipment/usecases/validation";

import CharacterUpdateValidatorImpl from "./character-update-validator";

const characterUpdateValidator = new CharacterUpdateValidatorImpl(characterRepository, equipmentExistenceValidation);

export { characterUpdateValidator };
