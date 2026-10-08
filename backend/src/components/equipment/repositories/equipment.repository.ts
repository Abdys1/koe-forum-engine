import { PrismaClient } from "@prisma/client";
import { EquipmentEntity } from "@src/components/equipment/models/equipment";
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

    public findAll = async (): Promise<EquipmentEntity[]> => {
        return this.db.equipment.findMany({ select: FIELDS, orderBy: { name: "asc" } });
    };

    public findAllByIds = async (ids: number[]): Promise<EquipmentEntity[]> => {
        return this.db.equipment.findMany({ select: FIELDS, where: { id: { in: ids } } });
    };

    public findById = async (id: number): Promise<EquipmentEntity | null> => {
        return this.db.equipment.findUnique({ select: FIELDS, where: { id } });
    };

    public findByNameAndTypeId = async (name: string, typeId: number): Promise<EquipmentEntity | null> => {
        return this.db.equipment.findUnique({ select: FIELDS, where: { name_typeId: { name, typeId } } });
    };

    public countAssignmentsByEquipmentId = async (id: number): Promise<number> => {
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

        return equipment.map((item) => ({
            id: item.id,
            slotCost: item.slotCost,
            slotId: item.type.slot?.id ?? null,
            slotMaxCapacity: item.type.slot?.maxCapacity ?? null
        }));
    };

    public create = async (equipment: EquipmentEntity): Promise<EquipmentEntity> => {
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

    public update = async (id: number, equipment: Pick<EquipmentEntity, "name" | "description">): Promise<EquipmentEntity> => {
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
