import { CharacterRepository } from "@src/components/character/repositories/types";
import { CharacterEquipmentInputDto } from "@src/components/character/types";
import { EquipmentValidationService } from "@src/components/equipment/services/equipment-validation.service";

import { CharacterUpdateValidator, ValidateCharacterUpdateInput, ValidateCharacterUpdateOutput, ValidateCharacterUpdateResult } from "./types";

export default class CharacterUpdateValidatorImpl implements CharacterUpdateValidator {
    private characterRepository: CharacterRepository;
    private equipmentValidationService: EquipmentValidationService;

    constructor(characterRepository: CharacterRepository, equipmentValidationService: EquipmentValidationService) {
        this.characterRepository = characterRepository;
        this.equipmentValidationService = equipmentValidationService;
    }

    public execute = async (input: ValidateCharacterUpdateInput): Promise<ValidateCharacterUpdateOutput> => {
        const hasRegisteredCharName: boolean = await this.characterRepository.existsByCharacterName(input.name);
        if (hasRegisteredCharName) {
            return { status: ValidateCharacterUpdateResult.ALREADY_EXISTS };
        }

        const hasInvalidEquipment = await this.hasInvalidEquipment(input.equipment);
        if (hasInvalidEquipment) {
            return { status: ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS };
        }

        return { status: ValidateCharacterUpdateResult.VALID };
    };

    private hasInvalidEquipment = async (equipment: CharacterEquipmentInputDto): Promise<boolean> => {
        const equipmentIds: number[] = Object.values(equipment).filter((id) => id !== null);
        return !(await this.equipmentValidationService.allExist(equipmentIds));
    };
}
