import { characterRepository } from "@src/components/character/repositories";
import CharacterRegistrationImpl from "@src/components/character/usecases/registration/character-registration";

const characterRegistration = new CharacterRegistrationImpl(characterRepository);

export { characterRegistration };