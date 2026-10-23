import EquipmentTypeRepositoryImpl from "@src/components/equipment-type/repositories/equipment-type.repository";
import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import PrismaRepositoryProvider from "@src/components/transaction/prisma-repository-provider";
import { RepositoryProvider } from "@src/components/transaction/types";
import { db } from "@src/prisma-client";

const equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository> = new PrismaRepositoryProvider(
    db,
    (client) => new EquipmentTypeRepositoryImpl(client)
);

export { equipmentTypeRepositories };
