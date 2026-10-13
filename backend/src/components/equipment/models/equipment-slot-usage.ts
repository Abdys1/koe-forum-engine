export interface SlotAllocation {
    slotId: number;
    maxCapacity: number;
    cost: number;
}

export interface EquipmentSlotUsage {
    id: number;
    slot: SlotAllocation | null;
}
