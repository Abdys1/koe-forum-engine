import { characterRepository } from "@src/components/character/repositories";
import CharacterCollectionUseCaseImpl from "@src/components/character/usecases/collection/character-collection";

const characterCollection = new CharacterCollectionUseCaseImpl(characterRepository);

export { characterCollection };