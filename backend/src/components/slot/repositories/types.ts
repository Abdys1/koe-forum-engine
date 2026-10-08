import { SlotEntity } from "@src/components/slot/models/slot";

export interface SlotRepository {
    findAll: () => Promise<SlotEntity[]>,
    findById: (id: number) => Promise<SlotEntity | null>,
    findByLabelIgnoreCase: (label: string) => Promise<SlotEntity | null>,
    create: (slot: SlotEntity) => Promise<SlotEntity>,
    delete: (id: number) => Promise<void>
}
