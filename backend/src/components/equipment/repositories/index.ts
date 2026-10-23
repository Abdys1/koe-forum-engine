import EquipmentRepositoryImpl from "@src/components/equipment/repositories/equipment.repository";
import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import PrismaRepositoryProvider from "@src/components/transaction/prisma-repository-provider";
import { RepositoryProvider } from "@src/components/transaction/types";
import { db } from "@src/prisma-client";

const equipmentRepositories: RepositoryProvider<EquipmentRepository> = new PrismaRepositoryProvider(
    db,
    (client) => new EquipmentRepositoryImpl(client)
);

export { equipmentRepositories };
