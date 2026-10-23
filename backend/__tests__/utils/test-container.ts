import { buildContainer } from "@src/container";

export const testContainer = buildContainer();

export const {
    db,
    transactionManager,
    userDao,
    characterRepositories,
    equipmentRepositories
} = testContainer.cradle;
