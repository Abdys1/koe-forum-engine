import EquipmentRepositoryImpl from "@src/components/equipment/repositories/equipment.repository";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { db } from "@src/prisma-client";

const equipmentRepository: EquipmentRepository = new EquipmentRepositoryImpl(db);

export { equipmentRepository };