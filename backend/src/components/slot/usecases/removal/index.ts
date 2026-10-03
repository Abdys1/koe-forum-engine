import { slotRepository } from "@src/components/slot/repositories";
import SlotRemovalImpl from "@src/components/slot/usecases/removal/slot-removal";
import { SlotRemoval } from "@src/components/slot/usecases/removal/types";

const slotRemoval: SlotRemoval = new SlotRemovalImpl(slotRepository);

export { slotRemoval };
