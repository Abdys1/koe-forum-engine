import { equipmentRepository } from "@src/components/equipment/repositories";
import EquipmentCollectionImpl from "@src/components/equipment/usecases/collection/equipment-collection";
import { EquipmentCollection } from "@src/components/equipment/usecases/collection/types";

const equipmentCollection: EquipmentCollection = new EquipmentCollectionImpl(equipmentRepository);

export { equipmentCollection };