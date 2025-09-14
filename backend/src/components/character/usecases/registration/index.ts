import { characterRepository } from "@src/components/character/repositories";
import CharacterRegistrationImpl from "@src/components/character/usecases/registration/character-registration";
import { equipmentRepository } from "@src/components/equipment/repositories";

const characterRegistration = new CharacterRegistrationImpl(characterRepository, equipmentRepository);

export { characterRegistration };