import { characterRepository } from "@src/components/character/repositories";
import CharacterEquipmentCollectionUseCaseImpl from "@src/components/character/usecases/equipment_collection/character-equipment-collection";
import { CharacterEquipmentCollectionUseCase } from "@src/components/character/usecases/equipment_collection/types";
import { equipmentRepository } from "@src/components/equipment/repositories";

const characterEquipmentCollection: CharacterEquipmentCollectionUseCase = new CharacterEquipmentCollectionUseCaseImpl(characterRepository, equipmentRepository);

export { characterEquipmentCollection };
