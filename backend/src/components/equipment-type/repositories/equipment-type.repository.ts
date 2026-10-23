import { EquipmentType, EquipmentTypeUpdate } from "@src/components/equipment-type/models/equipment-type";
import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { DbClient } from "@src/prisma-client";

const FIELDS = { id: true, label: true, slotId: true } as const;

export default class EquipmentTypeRepositoryImpl implements EquipmentTypeRepository {
    private db: DbClient;

    constructor(db: DbClient) {
        this.db = db;
    }

    public findAll = async (): Promise<EquipmentType[]> => {
        return this.db.equipmentType.findMany({
            select: FIELDS,
            orderBy: { label: "asc" }
        });
    };

    public findById = async (id: number): Promise<EquipmentType | null> => {
        return this.db.equipmentType.findUnique({ select: FIELDS, where: { id } });
    };

    public findByLabelIgnoreCase = async (label: string): Promise<EquipmentType | null> => {
        return this.db.equipmentType.findFirst({
            select: FIELDS,
            where: { label: { equals: label, mode: "insensitive" } }
        });
    };

    public countEquipmentByTypeId = async (id: number): Promise<number> => {
        return this.db.equipment.count({ where: { typeId: id } });
    };

    public create = async (equipmentType: EquipmentType): Promise<EquipmentType> => {
        return this.db.equipmentType.create({
            select: FIELDS,
            data: { label: equipmentType.label, slotId: equipmentType.slotId ?? null }
        });
    };

    public update = async (id: number, equipmentType: EquipmentTypeUpdate): Promise<EquipmentType> => {
        return this.db.equipmentType.update({ select: FIELDS, where: { id }, data: { label: equipmentType.label } });
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.equipmentType.delete({ where: { id } });
    };
}
