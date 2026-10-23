import { characterRepositories } from "@src/components/character/repositories";
import CharacterRegistrationUseCaseImpl from "@src/components/character/usecases/registration/character-registration";
import { equipmentRepositories } from "@src/components/equipment/repositories";
import { transactionManager } from "@src/components/transaction";

const characterRegistration = new CharacterRegistrationUseCaseImpl(transactionManager, characterRepositories, equipmentRepositories);

export { characterRegistration };
