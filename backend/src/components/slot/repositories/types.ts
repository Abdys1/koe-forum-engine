import { SlotEntity } from "@src/components/slot/models/slot";
import { Creatable, Deletable, Readable } from "@src/types";

export interface SlotRepository extends Readable<SlotEntity>, Creatable<SlotEntity>, Deletable {
    findByLabelIgnoreCase: (label: string) => Promise<SlotEntity | null>
}
