import { CharacterRepository } from "@src/components/character/repositories/types";
import { EquipmentExistenceValidation } from "@src/components/equipment/usecases/validation/types";

import { CharacterUpdateValidator, ValidateCharacterUpdateInput, ValidateCharacterUpdateOutput, ValidateCharacterUpdateResult } from "./types";

export default class CharacterUpdateValidatorImpl implements CharacterUpdateValidator {
    private characterRepository: CharacterRepository;
    private equipmentExistenceValidation: EquipmentExistenceValidation;

    constructor(characterRepository: CharacterRepository, equipmentExistenceValidation: EquipmentExistenceValidation) {
        this.characterRepository = characterRepository;
        this.equipmentExistenceValidation = equipmentExistenceValidation;
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

        return { status: ValidateCharacterUpdateResult.VALID };
    };

    /**
     * A nyers, ismétlődéseket tartalmazó listát adjuk át: a duplikáció érvényes
     * bemenet, a deduplikálás a létezés-ellenőrzés belső részlete.
     */
    private hasInvalidEquipment = async (equipmentIds: number[]): Promise<boolean> => {
        return !(await this.equipmentExistenceValidation.execute(equipmentIds));
    };
}
