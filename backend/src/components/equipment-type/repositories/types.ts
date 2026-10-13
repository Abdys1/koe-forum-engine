import { EquipmentType, EquipmentTypeUpdate } from "@src/components/equipment-type/models/equipment-type";
import { CrudRepository } from "@src/types";

export interface EquipmentTypeRepository extends CrudRepository<EquipmentType, EquipmentTypeUpdate> {
    findByLabelIgnoreCase: (label: string) => Promise<EquipmentType | null>,
    countEquipmentByTypeId: (id: number) => Promise<number>
}
