import { characterRepository } from "@src/components/character/repositories";
import CharacterRegistrationUseCaseImpl from "@src/components/character/usecases/registration/character-registration";

const characterRegistration = new CharacterRegistrationUseCaseImpl(characterRepository);

export { characterRegistration };