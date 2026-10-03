import { equipmentTypeRepository } from "@src/components/equipment-type/repositories";
import { slotRepository } from "@src/components/slot/repositories";
import SlotCreationImpl from "@src/components/slot/usecases/creation/slot-creation";
import { SlotCreation } from "@src/components/slot/usecases/creation/types";

const slotCreation: SlotCreation = new SlotCreationImpl(slotRepository, equipmentTypeRepository);

export { slotCreation };
