import { PrismaClient } from "@prisma/client";
import { Equipment, EquipmentUpdate } from "@src/components/equipment/models/equipment";
import { EquipmentSlotUsage } from "@src/components/equipment/models/equipment-slot-usage";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";

const FIELDS = {
    id: true,
    name: true,
    typeId: true,
    description: true,
    slotCost: true,
    type: { select: { id: true, label: true } }
} as const;

export default class EquipmentRepositoryImpl implements EquipmentRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public findAll = async (): Promise<Equipment[]> => {
        return this.db.equipment.findMany({ select: FIELDS, orderBy: { name: "asc" } });
    };

    public findAllByIds = async (ids: number[]): Promise<Equipment[]> => {
        return this.db.equipment.findMany({ select: FIELDS, where: { id: { in: ids } } });
    };

    public findById = async (id: number): Promise<Equipment | null> => {
        return this.db.equipment.findUnique({ select: FIELDS, where: { id } });
    };

    public findAllByCharacterId = async (characterId: number): Promise<Equipment[]> => {
        const assignments = await this.db.characterEquipment.findMany({
            where: { characterId },
            select: { equipment: { select: FIELDS } },
            orderBy: { id: "asc" }
        });
        return assignments.map((assignment) => assignment.equipment);
    };

    public findByNameAndTypeId = async (name: string, typeId: number): Promise<Equipment | null> => {
        return this.db.equipment.findUnique({ select: FIELDS, where: { name_typeId: { name, typeId } } });
    };

    public countAssignmentsById = async (id: number): Promise<number> => {
        return this.db.characterEquipment.count({ where: { equipmentId: id } });
    };

    public findSlotUsageByIds = async (ids: number[]): Promise<EquipmentSlotUsage[]> => {
        const equipment = await this.db.equipment.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                slotCost: true,
                type: { select: { slot: { select: { id: true, maxCapacity: true } } } }
            }
        });

        return equipment.map((item) => {
            const { slot } = item.type;
            if (!slot) {
                return { id: item.id, slot: null };
            }
            if (item.slotCost === null) {
                throw new Error(`Equipment ${item.id} belongs to a slotted type but has no slotCost`);
            }
            return { id: item.id, slot: { slotId: slot.id, maxCapacity: slot.maxCapacity, cost: item.slotCost } };
        });
    };

    public create = async (equipment: Equipment): Promise<Equipment> => {
        return this.db.equipment.create({
            select: FIELDS,
            data: {
                name: equipment.name,
                typeId: equipment.typeId,
                description: equipment.description,
                slotCost: equipment.slotCost === null ? undefined : equipment.slotCost
            }
        });
    };

    public update = async (id: number, equipment: EquipmentUpdate): Promise<Equipment> => {
        return this.db.equipment.update({
            select: FIELDS,
            where: { id },
            data: {
                name: equipment.name,
                description: equipment.description
            }
        });
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.equipment.delete({ where: { id } });
    };
}
