import { SlotEntity } from "@src/components/slot/models/slot";
import { SlotCollectionOutput, SlotDetails } from "@src/components/slot/usecases/collection/types";

export function toSlotCollectionOutput(slots: SlotEntity[]): SlotCollectionOutput {
    return slots.map(toSlotDetails);
}

export function toSlotDetails(slot: SlotEntity): SlotDetails {
    return {
        id: slot.id,
        label: slot.label,
        maxCapacity: slot.maxCapacity
    };
}
