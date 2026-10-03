import SlotRepositoryImpl from "@src/components/slot/repositories/slot.repository";
import { SlotRepository } from "@src/components/slot/repositories/types";
import { db } from "@src/prisma-client";

const slotRepository: SlotRepository = new SlotRepositoryImpl(db);

export { slotRepository };
