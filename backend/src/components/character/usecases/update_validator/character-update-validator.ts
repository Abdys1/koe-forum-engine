import { CharacterRepository } from "@src/components/character/repositories/types";
import { EquipmentExistenceValidationUseCase, SlotCapacityValidationUseCase } from "@src/components/equipment/usecases/validation/types";

import { CharacterUpdateValidatorUseCase, ValidateCharacterUpdateInput, ValidateCharacterUpdateOutput, ValidateCharacterUpdateResult } from "./types";

export default class CharacterUpdateValidatorUseCaseImpl implements CharacterUpdateValidatorUseCase {
    private characterRepository: CharacterRepository;
    private equipmentExistenceValidation: EquipmentExistenceValidationUseCase;
    private slotCapacityValidation: SlotCapacityValidationUseCase;

    constructor(
        characterRepository: CharacterRepository,
        equipmentExistenceValidation: EquipmentExistenceValidationUseCase,
        slotCapacityValidation: SlotCapacityValidationUseCase
    ) {
        this.characterRepository = characterRepository;
        this.equipmentExistenceValidation = equipmentExistenceValidation;
        this.slotCapacityValidation = slotCapacityValidation;
    }

    public execute = async (input: ValidateCharacterUpdateInput): Promise<ValidateCharacterUpdateOutput> => {
        const hasRegisteredCharName: boolean = await this.characterRepository.existsByCharacterName(input.name);
        if (hasRegisteredCharName) {
            return { status: ValidateCharacterUpdateResult.ALREADY_EXISTS };
        }

        const hasInvalidEquipment = await this.hasInvalidEquipment(input.equipmentIds);
        if (hasInvalidEquipment) {
            return { status: ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS };
        }

        const exceedsSlotCapacity = !(await this.slotCapacityValidation.execute(input.equipmentIds));
        if (exceedsSlotCapacity) {
            return { status: ValidateCharacterUpdateResult.SLOT_CAPACITY_EXCEEDED };
        }

        return { status: ValidateCharacterUpdateResult.VALID };
    };

    private hasInvalidEquipment = async (equipmentIds: number[]): Promise<boolean> => {
        return !(await this.equipmentExistenceValidation.execute(equipmentIds));
    };
}
