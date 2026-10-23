import { CharacterRepository } from "@src/components/character/repositories/types";
import { fromInput } from "@src/components/character/usecases/registration/mapper";
import {
  CharacterRegistrationUseCase,
  CreateCharacterInput,
} from "@src/components/character/usecases/registration/types";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import logger from "@src/components/logger/logger";
import { StorageService } from "@src/components/storage";
import { RepositoryProvider, TransactionManager } from "@src/components/transaction/types";

export const CHARACTER_IMAGE_DIRECTORY = "characters";

export default class CharacterRegistrationUseCaseImpl implements CharacterRegistrationUseCase {
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly characterRepositories: RepositoryProvider<CharacterRepository>,
    private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>,
    private readonly storageService: StorageService,
  ) {}

  public execute = async (createCharacterDto: CreateCharacterInput): Promise<void> => {
    const image = await this.storageService.upload(createCharacterDto.image, CHARACTER_IMAGE_DIRECTORY);
    try {
      await this.transactionManager.execute(async (tx) => {
        const character = await this.characterRepositories.inTransaction(tx).create(fromInput(createCharacterDto, image.url));
        await this.equipmentRepositories.inTransaction(tx).replaceAllByCharacterId(character.id!, createCharacterDto.equipmentIds);
      });
    } catch (error) {
      await this.storageService.delete(image.path).catch((deleteError) => logger.error(deleteError));
      throw error;
    }
  };
}
