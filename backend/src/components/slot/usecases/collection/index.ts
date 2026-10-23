import { slotRepositories } from "@src/components/slot/repositories";
import SlotCollectionImpl from "@src/components/slot/usecases/collection/slot-collection";
import { SlotCollection } from "@src/components/slot/usecases/collection/types";

const slotCollection: SlotCollection = new SlotCollectionImpl(slotRepositories);

export { slotCollection };
