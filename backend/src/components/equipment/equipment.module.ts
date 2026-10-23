import EquipmentController from "@src/components/equipment/equipment.controller";
import EquipmentRepositoryImpl from "@src/components/equipment/repositories/equipment.repository";
import EquipmentCollectionUseCaseImpl from "@src/components/equipment/usecases/collection/equipment-collection";
import EquipmentCreationUseCaseImpl from "@src/components/equipment/usecases/creation/equipment-creation";
import EquipmentModificationUseCaseImpl from "@src/components/equipment/usecases/modification/equipment-modification";
import EquipmentRemovalUseCaseImpl from "@src/components/equipment/usecases/removal/equipment-removal";
import EquipmentExistenceValidationUseCaseImpl from "@src/components/equipment/usecases/validation/equipment-existence-validation";
import SlotCapacityValidationUseCaseImpl from "@src/components/equipment/usecases/validation/slot-capacity-validation";
import { repositoryProvider } from "@src/components/transaction/transaction.module";
import { asClass } from "awilix";

export const equipmentModule = {
    equipmentRepositories: repositoryProvider((client) => new EquipmentRepositoryImpl(client)),
    equipmentCollection: asClass(EquipmentCollectionUseCaseImpl).singleton(),
    equipmentCreation: asClass(EquipmentCreationUseCaseImpl).singleton(),
    equipmentModification: asClass(EquipmentModificationUseCaseImpl).singleton(),
    equipmentRemoval: asClass(EquipmentRemovalUseCaseImpl).singleton(),
    equipmentExistenceValidation: asClass(EquipmentExistenceValidationUseCaseImpl).singleton(),
    slotCapacityValidation: asClass(SlotCapacityValidationUseCaseImpl).singleton(),
    equipmentController: asClass(EquipmentController).singleton(),
};
