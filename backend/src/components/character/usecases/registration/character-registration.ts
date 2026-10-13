import Character from "@src/components/character/models/character";
import { CharacterRepository } from "@src/components/character/repositories/types";
import { fromInput } from "@src/components/character/usecases/registration/mapper";
import {
  CharacterRegistrationUseCase,
  CreateCharacterInput,
} from "@src/components/character/usecases/registration/types";

export default class CharacterRegistrationUseCaseImpl implements CharacterRegistrationUseCase {
  private characterRepository: CharacterRepository;

  constructor(characterDao: CharacterRepository) {
    this.characterRepository = characterDao;
  }

  public execute = async (createCharacterDto: CreateCharacterInput): Promise<void> => {
    const character: Character = fromInput(createCharacterDto);
    await this.characterRepository.create(character);
  };
}
