import { CharacterRepository } from "@src/components/character/repositories/types";
import { EquipmentExistenceValidation, SlotCapacityValidation } from "@src/components/equipment/usecases/validation/types";

import { CharacterUpdateValidator, ValidateCharacterUpdateInput, ValidateCharacterUpdateOutput, ValidateCharacterUpdateResult } from "./types";

export default class CharacterUpdateValidatorImpl implements CharacterUpdateValidator {
    private characterRepository: CharacterRepository;
    private equipmentExistenceValidation: EquipmentExistenceValidation;
    private slotCapacityValidation: SlotCapacityValidation;

    constructor(
        characterRepository: CharacterRepository,
        equipmentExistenceValidation: EquipmentExistenceValidation,
        slotCapacityValidation: SlotCapacityValidation
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
