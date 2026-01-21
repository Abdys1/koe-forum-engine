import { CharacterUpdateValidator, ValidateCharacterUpdateInput, ValidateCharacterUpdateOutput, ValidateCharacterUpdateResult } from "@src/components/character/usecases/update_validator/types";
import { CharacterRepository } from "@src/components/character/repositories/types";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import { CharacterEquipmentInputDto } from "@src/components/character/types";

export default class CharacterUpdateValidatorImpl implements CharacterUpdateValidator {
    private characterRepository: CharacterRepository;
    private equipmentRepository: EquipmentRepository;

    constructor(characterDao: CharacterRepository, equipmentRepository: EquipmentRepository) {
        this.characterRepository = characterDao;
        this.equipmentRepository = equipmentRepository;
    }

    public execute = async (input: ValidateCharacterUpdateInput): Promise<ValidateCharacterUpdateOutput> => {
        const hasRegisteredCharName: boolean = await this.characterRepository.existsByCharacterName(input.name);
        if (hasRegisteredCharName) {
            return { status: ValidateCharacterUpdateResult.ALREADY_EXISTS };
        }
            
        const hasInvalidEquipment = await this.hasInvalidEquipment(input.equipment);
        if (hasInvalidEquipment) {
          return { status: ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS};
        }

        return { status: ValidateCharacterUpdateResult.VALID };
    }

    private hasInvalidEquipment = async (equipment: CharacterEquipmentInputDto): Promise<boolean> => {
        const equipmentIds: number[] = Object.values(equipment).filter((id) => id !== null);
        const equipmentsFromDb: EquipmentEntity[] = await this.equipmentRepository.findAllByIds(equipmentIds);
        return equipmentIds.length !== equipmentsFromDb.length;
    }
}