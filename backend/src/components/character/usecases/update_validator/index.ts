import { characterRepository } from "@src/components/character/repositories";
import { equipmentValidationService } from "@src/components/equipment/services";

import CharacterUpdateValidatorImpl from "./character-update-validator";

const characterUpdateValidator = new CharacterUpdateValidatorImpl(characterRepository, equipmentValidationService);

export { characterUpdateValidator };
