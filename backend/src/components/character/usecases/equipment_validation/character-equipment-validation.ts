import { CharacterEquipmentValidationResult, CharacterEquipmentValidationUseCase } from "@src/components/character/usecases/equipment_validation/types";
import { EquipmentExistenceValidationUseCase, SlotCapacityValidationUseCase } from "@src/components/equipment/usecases/validation/types";

export default class CharacterEquipmentValidationUseCaseImpl implements CharacterEquipmentValidationUseCase {
    constructor(
        private readonly equipmentExistenceValidation: EquipmentExistenceValidationUseCase,
        private readonly slotCapacityValidation: SlotCapacityValidationUseCase
    ) {}

    public execute = async (equipmentIds: number[]): Promise<CharacterEquipmentValidationResult> => {
        if (!(await this.equipmentExistenceValidation.execute(equipmentIds))) {
            return CharacterEquipmentValidationResult.EQUIPMENT_NOT_EXISTS;
        }
        if (!(await this.slotCapacityValidation.execute(equipmentIds))) {
            return CharacterEquipmentValidationResult.SLOT_CAPACITY_EXCEEDED;
        }
        return CharacterEquipmentValidationResult.VALID;
    };
}
