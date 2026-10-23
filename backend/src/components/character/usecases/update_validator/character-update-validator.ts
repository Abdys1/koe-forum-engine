import { CharacterRepository } from "@src/components/character/repositories/types";
import { CharacterEquipmentValidationResult, CharacterEquipmentValidationUseCase } from "@src/components/character/usecases/equipment_validation/types";
import { RepositoryProvider } from "@src/components/transaction/types";

import { CharacterUpdateValidatorUseCase, ValidateCharacterUpdateInput, ValidateCharacterUpdateOutput, ValidateCharacterUpdateResult } from "./types";

const EQUIPMENT_VALIDATION_FAILURES = {
    [CharacterEquipmentValidationResult.EQUIPMENT_NOT_EXISTS]: ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS,
    [CharacterEquipmentValidationResult.SLOT_CAPACITY_EXCEEDED]: ValidateCharacterUpdateResult.SLOT_CAPACITY_EXCEEDED
} as const;

export default class CharacterUpdateValidatorUseCaseImpl implements CharacterUpdateValidatorUseCase {
    constructor(
        private readonly characterRepositories: RepositoryProvider<CharacterRepository>,
        private readonly characterEquipmentValidation: CharacterEquipmentValidationUseCase
    ) {}

    public execute = async (input: ValidateCharacterUpdateInput): Promise<ValidateCharacterUpdateOutput> => {
        const hasRegisteredCharName: boolean = await this.characterRepositories.get().existsByCharacterName(input.name);
        if (hasRegisteredCharName) {
            return { status: ValidateCharacterUpdateResult.ALREADY_EXISTS };
        }

        const equipmentValidation = await this.characterEquipmentValidation.execute(input.equipmentIds);
        if (equipmentValidation !== CharacterEquipmentValidationResult.VALID) {
            return { status: EQUIPMENT_VALIDATION_FAILURES[equipmentValidation] };
        }

        return { status: ValidateCharacterUpdateResult.VALID };
    };
}
