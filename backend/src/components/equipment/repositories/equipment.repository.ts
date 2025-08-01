import { PrismaClient } from "@prisma/client";
import { EquipmentEntity, EquipmentType } from "@src/components/equipment/models/equipment";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";

export default class EquipmentRepositoryImpl implements EquipmentRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public findAll = async (): Promise<EquipmentEntity[]> => {
        const result = await this.db.equipment.findMany();
        return result.map((equipment) => {
            return {
                id: equipment.id,
                name: equipment.name,
                type: equipment.type as EquipmentType,
                description: equipment.description
            }
        });
    };

    public create = (entity: EquipmentEntity): Promise<void> => {
        throw new Error("Method not implemented.");
    };
}