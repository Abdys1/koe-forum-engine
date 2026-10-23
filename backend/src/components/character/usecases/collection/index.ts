import { characterRepositories } from "@src/components/character/repositories";
import CharacterCollectionUseCaseImpl from "@src/components/character/usecases/collection/character-collection";

const characterCollection = new CharacterCollectionUseCaseImpl(characterRepositories);

export { characterCollection };