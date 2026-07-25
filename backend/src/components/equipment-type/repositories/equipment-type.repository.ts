import { PrismaClient } from "@prisma/client";
import { EquipmentTypeEntity } from "@src/components/equipment-type/models/equipment-type";
import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";

const FIELDS = { id: true, label: true } as const;

export default class EquipmentTypeRepositoryImpl implements EquipmentTypeRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public findAll = async (): Promise<EquipmentTypeEntity[]> => {
        return this.db.equipmentType.findMany({
            select: FIELDS,
            orderBy: { label: "asc" }
        });
    };

    public findById = async (id: number): Promise<EquipmentTypeEntity | null> => {
        return this.db.equipmentType.findUnique({ select: FIELDS, where: { id } });
    };

    public findByLabelIgnoreCase = async (label: string): Promise<EquipmentTypeEntity | null> => {
        return this.db.equipmentType.findFirst({
            select: FIELDS,
            where: { label: { equals: label, mode: "insensitive" } }
        });
    };

    public countEquipmentByTypeId = async (id: number): Promise<number> => {
        return this.db.equipment.count({ where: { typeId: id } });
    };

    public create = async (equipmentType: EquipmentTypeEntity): Promise<EquipmentTypeEntity> => {
        return this.db.equipmentType.create({
            select: FIELDS,
            data: { label: equipmentType.label }
        });
    };

    public update = async (id: number, label: string): Promise<EquipmentTypeEntity> => {
        return this.db.equipmentType.update({ select: FIELDS, where: { id }, data: { label } });
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.equipmentType.delete({ where: { id } });
    };
}
