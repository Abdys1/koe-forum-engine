import { db } from "@src/prisma-client";

export async function saveTestUserToDb(): Promise<{ id: number, username: string, password: string }> {
  return db.forumUser.create({ data: createRandomUser() });
}

export function createRandomUser(): { username: string, password: string } {
  return { username: generateUsername(), password: generatePassword() };
}

export function generateUsername(): string {
  return `test_user_${randomSuffix()}`;
}

export function generatePassword(): string {
  return `Test_pwd_${randomSuffix()}`;
}

export function generateEquipmentTypeLabel(): string {
  return `Teszt típus ${randomSuffix()}`;
}

export function generateSlotLabel(): string {
  return `Teszt slot ${randomSuffix()}`;
}

export function generateEquipmentName(): string {
  return `Teszt felszerelés ${randomSuffix()}`;
}

export async function saveEquipmentTypeToDb(label: string = generateEquipmentTypeLabel(), slotId?: number) {
  return db.equipmentType.create({ data: { label, slotId } });
}

export async function saveEquipmentToDb(overrides: { name?: string, typeId?: number, description?: string, slotCost?: number } = {}) {
  const typeId = overrides.typeId ?? (await saveEquipmentTypeToDb()).id;
  return db.equipment.create({
    data: {
      name: overrides.name ?? generateEquipmentName(),
      description: overrides.description ?? `Leírás ${randomSuffix()}`,
      typeId,
      slotCost: overrides.slotCost ?? 1
    }
  });
}

export async function saveEquipmentListToDb(count: number, typeId?: number) {
  const equipmentList = [];
  for (let i = 0; i < count; i++) {
    equipmentList.push(await saveEquipmentToDb({ typeId }));
  }
  return equipmentList;
}

export async function saveSlotToDb(overrides: { label?: string, maxCapacity?: number } = {}) {
  return db.slot.create({
    data: {
      label: overrides.label ?? generateSlotLabel(),
      maxCapacity: overrides.maxCapacity ?? 1
    }
  });
}

function randomSuffix(): number {
  return Math.floor(Date.now() * Math.random());
}
