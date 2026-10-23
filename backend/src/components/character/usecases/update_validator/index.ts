import { characterRepositories } from "@src/components/character/repositories";
import { characterEquipmentValidation } from "@src/components/character/usecases/equipment_validation";

import CharacterUpdateValidatorUseCaseImpl from "./character-update-validator";

const characterUpdateValidator = new CharacterUpdateValidatorUseCaseImpl(characterRepositories, characterEquipmentValidation);

export { characterUpdateValidator };
