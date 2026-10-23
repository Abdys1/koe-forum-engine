import { slotRepositories } from "@src/components/slot/repositories";
import SlotCreationImpl from "@src/components/slot/usecases/creation/slot-creation";
import { SlotCreation } from "@src/components/slot/usecases/creation/types";

const slotCreation: SlotCreation = new SlotCreationImpl(slotRepositories);

export { slotCreation };
