import EquipmentTypeController from "@src/components/equipment-type/equipment-type.controller";
import EquipmentTypeRepositoryImpl from "@src/components/equipment-type/repositories/equipment-type.repository";
import EquipmentTypeCollectionImpl from "@src/components/equipment-type/usecases/collection/equipment-type-collection";
import EquipmentTypeCreationImpl from "@src/components/equipment-type/usecases/creation/equipment-type-creation";
import EquipmentTypeModificationImpl from "@src/components/equipment-type/usecases/modification/equipment-type-modification";
import EquipmentTypeRemovalImpl from "@src/components/equipment-type/usecases/removal/equipment-type-removal";
import { repositoryProvider } from "@src/components/transaction/transaction.module";
import { asClass } from "awilix";

export const equipmentTypeModule = {
    equipmentTypeRepositories: repositoryProvider((client) => new EquipmentTypeRepositoryImpl(client)),
    equipmentTypeCollection: asClass(EquipmentTypeCollectionImpl).singleton(),
    equipmentTypeCreation: asClass(EquipmentTypeCreationImpl).singleton(),
    equipmentTypeModification: asClass(EquipmentTypeModificationImpl).singleton(),
    equipmentTypeRemoval: asClass(EquipmentTypeRemovalImpl).singleton(),
    equipmentTypeController: asClass(EquipmentTypeController).singleton(),
};
