import { PrismaClient } from "@prisma/client";
import config from "@src/config";

export const db = new PrismaClient({
    datasources: {
        db: {
            url: config.database.url
        }
    }
});