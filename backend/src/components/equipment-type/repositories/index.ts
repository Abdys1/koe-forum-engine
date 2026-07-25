import EquipmentTypeRepositoryImpl from "@src/components/equipment-type/repositories/equipment-type.repository";
import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { db } from "@src/prisma-client";

const equipmentTypeRepository: EquipmentTypeRepository = new EquipmentTypeRepositoryImpl(db);

export { equipmentTypeRepository };
