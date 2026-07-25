import { PrismaClient } from "@prisma/client";
import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";

/** A típus join-olva jön, hogy a válaszban `{ id, label }` objektumként mehessen. */
const FIELDS = {
    id: true,
    name: true,
    typeId: true,
    description: true,
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

    public existsTypeById = async (typeId: number): Promise<boolean> => {
        return (await this.db.equipmentType.count({ where: { id: typeId } })) > 0;
    };

    public create = async (equipment: EquipmentEntity): Promise<EquipmentEntity> => {
        return this.db.equipment.create({
            select: FIELDS,
            data: { name: equipment.name, typeId: equipment.typeId, description: equipment.description }
        });
    };

    public update = async (id: number, equipment: EquipmentEntity): Promise<EquipmentEntity> => {
        return this.db.equipment.update({
            select: FIELDS,
            where: { id },
            data: { name: equipment.name, typeId: equipment.typeId, description: equipment.description }
        });
    };

    public delete = async (id: number): Promise<void> => {
        await this.db.equipment.delete({ where: { id } });
    };
}
