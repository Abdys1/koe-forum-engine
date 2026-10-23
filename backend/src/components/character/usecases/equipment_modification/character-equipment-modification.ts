import { CharacterRepository } from "@src/components/character/repositories/types";
import {
    CharacterEquipmentModificationResult,
    CharacterEquipmentModificationUseCase,
    ModifyCharacterEquipmentInput,
    ModifyCharacterEquipmentOutput
} from "@src/components/character/usecases/equipment_modification/types";
import { CharacterEquipmentValidationResult, CharacterEquipmentValidationUseCase } from "@src/components/character/usecases/equipment_validation/types";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";
import { RepositoryProvider } from "@src/components/transaction/types";

const VALIDATION_FAILURES = {
    [CharacterEquipmentValidationResult.EQUIPMENT_NOT_EXISTS]: CharacterEquipmentModificationResult.EQUIPMENT_NOT_EXISTS,
    [CharacterEquipmentValidationResult.SLOT_CAPACITY_EXCEEDED]: CharacterEquipmentModificationResult.SLOT_CAPACITY_EXCEEDED
} as const;

export default class CharacterEquipmentModificationUseCaseImpl implements CharacterEquipmentModificationUseCase {
    constructor(
        private readonly characterRepositories: RepositoryProvider<CharacterRepository>,
        private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>,
        private readonly characterEquipmentValidation: CharacterEquipmentValidationUseCase
    ) {}

    public execute = async (input: ModifyCharacterEquipmentInput): Promise<ModifyCharacterEquipmentOutput> => {
        const character = await this.characterRepositories.get().findById(input.characterId);
        if (!character) {
            return { status: CharacterEquipmentModificationResult.NOT_FOUND };
        }
        if (character.userId !== input.userId) {
            return { status: CharacterEquipmentModificationResult.NOT_OWNED };
        }

        const validation = await this.characterEquipmentValidation.execute(input.equipmentIds);
        if (validation !== CharacterEquipmentValidationResult.VALID) {
            return { status: VALIDATION_FAILURES[validation] };
        }

        await this.equipmentRepositories.get().replaceAllByCharacterId(input.characterId, input.equipmentIds);
        const equipment = await this.equipmentRepositories.get().findAllByCharacterId(input.characterId);
        return { status: CharacterEquipmentModificationResult.UPDATED, equipment: equipment.map(toEquipmentDetails) };
    };
}
