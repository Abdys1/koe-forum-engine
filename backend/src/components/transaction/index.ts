import PrismaTransactionManager from "@src/components/transaction/prisma-transaction-manager";
import { TransactionManager } from "@src/components/transaction/types";
import { db } from "@src/prisma-client";

const transactionManager: TransactionManager = new PrismaTransactionManager(db);

export { transactionManager };
