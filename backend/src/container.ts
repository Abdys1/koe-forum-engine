import { authModule } from "@src/components/auth/auth.module";
import { characterModule } from "@src/components/character/character.module";
import { equipmentModule } from "@src/components/equipment/equipment.module";
import { equipmentTypeModule } from "@src/components/equipment-type/equipment-type.module";
import { slotModule } from "@src/components/slot/slot.module";
import { storageModule } from "@src/components/storage/storage.module";
import { transactionModule } from "@src/components/transaction/transaction.module";
import { userModule } from "@src/components/user/user.module";
import { createDbClient } from "@src/prisma-client";
import { asFunction, AwilixContainer, createContainer, InjectionMode, Resolver } from "awilix";

const registrations = {
    db: asFunction(createDbClient).singleton().disposer((db) => db.$disconnect()),
    ...transactionModule,
    ...storageModule,
    ...userModule,
    ...authModule,
    ...slotModule,
    ...equipmentTypeModule,
    ...equipmentModule,
    ...characterModule,
};

export type Cradle = { [K in keyof typeof registrations]: (typeof registrations)[K] extends Resolver<infer T> ? T : never };

export type AppContainer = AwilixContainer<Cradle>;

export const buildContainer = (overrides: Partial<{ [K in keyof Cradle]: Resolver<Cradle[K]> }> = {}): AppContainer => {
    const container = createContainer<Cradle>({ injectionMode: InjectionMode.CLASSIC, strict: true });

    container.register({ ...registrations, ...overrides });

    return container;
};
