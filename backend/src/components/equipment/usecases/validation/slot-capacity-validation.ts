import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { RepositoryProvider } from "@src/components/transaction/types";

import { SlotCapacityValidationUseCase } from "./types";

export default class SlotCapacityValidationUseCaseImpl implements SlotCapacityValidationUseCase {
    constructor(private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>) {}

    public execute = async (equipmentIds: number[]): Promise<boolean> => {
        if (equipmentIds.length === 0) {
            return true;
        }

        const uniqueEquipmentIds = [...new Set(equipmentIds)];
        const usages = await this.equipmentRepositories.get().findSlotUsageByIds(uniqueEquipmentIds);
        const usageByEquipmentId = new Map(usages.map((usage) => [usage.id, usage]));

        return this.isWithinCapacity(equipmentIds, usageByEquipmentId);
    };

    // A nyers, duplikátumokat is tartalmazó `equipmentIds` tömbön dolgozik, mert
    // ugyanaz az equipment id többször is megadható, és mindegyik
    // előfordulás a saját slotCost-jával foglal kapacitást.
    private isWithinCapacity = (equipmentIds: number[], usageByEquipmentId: Map<number, EquipmentSlotUsage>): boolean => {
        const usedCapacityBySlotId = new Map<number, number>();
        let withinCapacity = true;
        for (const equipmentId of equipmentIds) {
            const slot = usageByEquipmentId.get(equipmentId)?.slot;
            if (slot) {
                const usedCapacity = (usedCapacityBySlotId.get(slot.slotId) ?? 0) + slot.cost;
                if (usedCapacity > slot.maxCapacity) {
                    withinCapacity = false;
                    break;
                }
                usedCapacityBySlotId.set(slot.slotId, usedCapacity);
            }
        }
        return withinCapacity;
    };
}
