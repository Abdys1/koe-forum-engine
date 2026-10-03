import { SlotEntity } from "@src/components/slot/models/slot";

export interface SlotRepository {
    findAll: () => Promise<SlotEntity[]>,
    findById: (id: number) => Promise<SlotEntity | null>,
    findByEquipmentTypeId: (equipmentTypeId: number) => Promise<SlotEntity | null>,
    create: (slot: SlotEntity) => Promise<SlotEntity>,
    delete: (id: number) => Promise<void>
}
