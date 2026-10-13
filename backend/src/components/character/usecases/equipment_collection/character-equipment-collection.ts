import { CharacterRepository } from "@src/components/character/repositories/types";
import {
    CharacterEquipmentCollectionInput,
    CharacterEquipmentCollectionOutput,
    CharacterEquipmentCollectionResult,
    CharacterEquipmentCollectionUseCase
} from "@src/components/character/usecases/equipment_collection/types";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";

export default class CharacterEquipmentCollectionUseCaseImpl implements CharacterEquipmentCollectionUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository,
        private readonly equipmentRepository: EquipmentRepository
    ) {}

    public execute = async (input: CharacterEquipmentCollectionInput): Promise<CharacterEquipmentCollectionOutput> => {
        const character = await this.characterRepository.findById(input.characterId);
        if (!character) {
            return { status: CharacterEquipmentCollectionResult.NOT_FOUND };
        }

        const equipment = await this.equipmentRepository.findAllByCharacterId(input.characterId);
        return { status: CharacterEquipmentCollectionResult.FOUND, equipment: equipment.map(toEquipmentDetails) };
    };
}
