import { CharacterRepository } from "@src/components/character/repositories/types";
import { fromInput } from "@src/components/character/usecases/registration/mapper";
import {
  CharacterRegistrationUseCase,
  CreateCharacterInput,
} from "@src/components/character/usecases/registration/types";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { RepositoryProvider, TransactionManager } from "@src/components/transaction/types";

export default class CharacterRegistrationUseCaseImpl implements CharacterRegistrationUseCase {
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly characterRepositories: RepositoryProvider<CharacterRepository>,
    private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>,
  ) {}

  public execute = async (createCharacterDto: CreateCharacterInput): Promise<void> => {
    await this.transactionManager.execute(async (tx) => {
      const character = await this.characterRepositories.inTransaction(tx).create(fromInput(createCharacterDto));
      await this.equipmentRepositories.inTransaction(tx).replaceAllByCharacterId(character.id!, createCharacterDto.equipmentIds);
    });
  };
}
