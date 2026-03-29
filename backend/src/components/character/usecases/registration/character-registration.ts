import CharacterEntity from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";
import { fromInput } from "@src/components/character/usecases/registration/mapper";
import {
  CharacterRegistration,
  CreateCharacterInput,
} from "@src/components/character/usecases/registration/types";

export default class CharacterRegistrationImpl implements CharacterRegistration {
  private characterRepository: CharacterRepository;

  constructor(characterDao: CharacterRepository) {
    this.characterRepository = characterDao;
  }

  public execute = async (createCharacterDto: CreateCharacterInput): Promise<void> => {
    const character: CharacterEntity = fromInput(createCharacterDto);
    await this.characterRepository.create(character);
  };
}
