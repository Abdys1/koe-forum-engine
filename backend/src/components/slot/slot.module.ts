import SlotRepositoryImpl from "@src/components/slot/repositories/slot.repository";
import SlotController from "@src/components/slot/slot.controller";
import SlotCollectionImpl from "@src/components/slot/usecases/collection/slot-collection";
import SlotCreationImpl from "@src/components/slot/usecases/creation/slot-creation";
import SlotRemovalImpl from "@src/components/slot/usecases/removal/slot-removal";
import { repositoryProvider } from "@src/components/transaction/transaction.module";
import { asClass } from "awilix";

export const slotModule = {
    slotRepositories: repositoryProvider((client) => new SlotRepositoryImpl(client)),
    slotCollection: asClass(SlotCollectionImpl).singleton(),
    slotCreation: asClass(SlotCreationImpl).singleton(),
    slotRemoval: asClass(SlotRemovalImpl).singleton(),
    slotController: asClass(SlotController).singleton(),
};
