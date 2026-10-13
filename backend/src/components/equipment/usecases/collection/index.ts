import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentCollectionUseCaseImpl from "@src/components/equipment/usecases/collection/equipment-collection";
import { EquipmentCollectionUseCase } from "@src/components/equipment/usecases/collection/types";

const equipmentCollection: EquipmentCollectionUseCase = new EquipmentCollectionUseCaseImpl(equipmentRepository);

export { equipmentCollection };