import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";

import { SlotCapacityValidation } from "./types";

export default class SlotCapacityValidationImpl implements SlotCapacityValidation {
    constructor(private readonly equipmentRepository: EquipmentRepository) {}

    public execute = async (equipmentIds: number[]): Promise<boolean> => {
        if (equipmentIds.length === 0) {
            return true;
        }

        const uniqueEquipmentIds = [...new Set(equipmentIds)];
        const usages = await this.equipmentRepository.findSlotUsageByIds(uniqueEquipmentIds);
        const usageByEquipmentId = new Map(usages.map((usage) => [usage.id, usage]));

        return this.isWithinCapacity(equipmentIds, usageByEquipmentId);
    };

    // A nyers, duplikátumokat is tartalmazó `equipmentIds` tömbön dolgozik, mert
    // ugyanaz az equipment id többször is megadható, és mindegyik
    // előfordulás a saját slotCost-jával foglal kapacitást.
    private isWithinCapacity = (equipmentIds: number[], usageByEquipmentId: Map<number, EquipmentSlotUsage>): boolean => {
        const usedCapacityBySlotId = new Map<number, number>();
        for (const equipmentId of equipmentIds) {
            const usage = usageByEquipmentId.get(equipmentId);
            if (usage && usage.slotId !== null) {
                const usedCapacity = (usedCapacityBySlotId.get(usage.slotId) ?? 0) + (usage.slotCost ?? 0);
                if (usedCapacity > (usage.slotMaxCapacity ?? 0)) {
                    return false;
                }
                usedCapacityBySlotId.set(usage.slotId, usedCapacity);
            }
        }
        return true;
    };
}
