import { characterRepository } from "@src/components/character/repositories";
import CharacterCollectionImpl from "@src/components/character/usecases/collection/character-collection";

const characterCollection = new CharacterCollectionImpl(characterRepository);

export { characterCollection };