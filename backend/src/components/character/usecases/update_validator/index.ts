import CharacterUpdateValidatorImpl from "./character-update-validator";
import { equipmentRepository } from "@src/components/equipment/repositories";
import { characterRepository } from "@src/components/character/repositories";

const characterUpdateValidator = new CharacterUpdateValidatorImpl(characterRepository, equipmentRepository);

export { characterUpdateValidator };