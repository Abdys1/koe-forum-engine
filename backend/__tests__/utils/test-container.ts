import LocalStorageService from "@src/components/storage/local-storage.service";
import { LOCAL_UPLOADS_PUBLIC_PATH } from "@src/components/storage/storage.module";
import { buildContainer } from "@src/container";
import { asValue } from "awilix";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export const uploadsDir = mkdtempSync(join(tmpdir(), "koe-uploads-"));

export const testContainer = buildContainer({
    storageService: asValue(new LocalStorageService(uploadsDir, LOCAL_UPLOADS_PUBLIC_PATH)),
});

export const {
    db,
    transactionManager,
    userDao,
    characterRepositories,
    equipmentRepositories
} = testContainer.cradle;
