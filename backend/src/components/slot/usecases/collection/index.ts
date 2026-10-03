import { slotRepository } from "@src/components/slot/repositories";
import SlotCollectionImpl from "@src/components/slot/usecases/collection/slot-collection";
import { SlotCollection } from "@src/components/slot/usecases/collection/types";

const slotCollection: SlotCollection = new SlotCollectionImpl(slotRepository);

export { slotCollection };
