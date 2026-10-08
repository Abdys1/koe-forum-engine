import { PrismaClient } from "@prisma/client";
import { SlotEntity } from "@src/components/slot/models/slot";
import { SlotRepository } from "@src/components/slot/repositories/types";

const FIELDS = {
    id: true,
    label: true,
    maxCapacity: true
} as const;

export default class SlotRepositoryImpl implements SlotRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public findAll = async (): Promise<SlotEntity[]> => {
        return this.db.slot.findMany({
            select: FIELDS,
            orderBy: { label: "asc" }
        });
    };

    public findById = async (id: number): Promise<SlotEntity | null> => {
        return this.db.slot.findUnique({ select: FIELDS, where: { id } });
    };

    public findByLabelIgnoreCase = async (label: string): Promise<SlotEntity | null> => {
        return this.db.slot.findFirst({
            select: FIELDS,
            where: { label: { equals: label, mode: "insensitive" } }
        });
    };

    public create = async (slot: SlotEntity): Promise<SlotEntity> => {
        return this.db.slot.create({
            select: FIELDS,
            data: { label: slot.label, maxCapacity: slot.maxCapacity }
        });
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.slot.delete({ where: { id } });
    };
}
