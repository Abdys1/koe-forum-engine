import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import EquipmentTypeCollectionImpl from "@src/components/equipment-type/usecases/collection/equipment-type-collection";
import { EquipmentTypeCollection } from "@src/components/equipment-type/usecases/collection/types";

const equipmentTypeCollection: EquipmentTypeCollection = new EquipmentTypeCollectionImpl(equipmentTypeRepository);

export { equipmentTypeCollection };
