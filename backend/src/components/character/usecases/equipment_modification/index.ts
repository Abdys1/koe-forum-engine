import { characterRepositories } from "@src/components/character/repositories";
import CharacterEquipmentModificationUseCaseImpl from "@src/components/character/usecases/equipment_modification/character-equipment-modification";
import { CharacterEquipmentModificationUseCase } from "@src/components/character/usecases/equipment_modification/types";
import { characterEquipmentValidation } from "@src/components/character/usecases/equipment_validation";
import { equipmentRepositories } from "@src/components/equipment/repositories";

const characterEquipmentModification: CharacterEquipmentModificationUseCase = new CharacterEquipmentModificationUseCaseImpl(
    characterRepositories,
    equipmentRepositories,
    characterEquipmentValidation
);

export { characterEquipmentModification };
