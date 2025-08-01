import { EquipmentEntity } from "@src/components/equipment/models/equipment";
import { Repository } from "@src/types";

export interface EquipmentRepository extends Repository<EquipmentEntity> {
    findAll: () => Promise<EquipmentEntity[]>
}