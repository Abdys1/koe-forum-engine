import { db } from "./db";

interface SeedEquipmentType {
  label: string;
  icon?: string;
  slots?: number;
  slotCost?: number;
  children?: SeedEquipmentType[];
  items?: string[];
}

const equipmentTypes: SeedEquipmentType[] = [
  {
    label: "Fegyverzet",
    icon: "swords",
    slots: 5,
    children: [
      { label: "Kardok", slotCost: 1, items: ["Rövidkard", "Hosszúkard"] },
      {
        label: "Szablyák",
        slotCost: 1,
        items: [
          "Kalóz szablya",
          "Huszár szablya",
          "Mágikus lángoló szablya",
          "Lovassági szablya",
          "Tiszti díszszablya",
          "Sivatagi görbe szablya",
          "Kalandozó szablya",
        ],
      },
      { label: "Balták és bárdok", slotCost: 2, items: ["Fokos", "Csatabárd"] },
      { label: "Lándzsák", slotCost: 2, items: ["Lándzsa", "Hajítólándzsa"] },
      { label: "Pajzsok", slotCost: 1, items: ["Kerek fapajzs", "Ökölpajzs"] },
    ],
  },
  {
    label: "Páncélzat",
    icon: "shield",
    children: [
      { label: "Sisakok", slots: 1, slotCost: 1, items: ["Nyitott bőrsisak", "Fazéksisak", "Vaskalap"] },
      { label: "Vértek", slots: 1, slotCost: 1, items: ["Gambeson", "Bőrvért", "Lamellás vért"] },
      {
        label: "Karvédők",
        slots: 2,
        slotCost: 1,
        items: ["Páncélkesztyű", "Bőrkesztyű", "Fém alkarvédő", "Bőr alkarvédő"],
      },
      { label: "Lábvértek", slots: 1, slotCost: 1, items: ["Bőr lábvért", "Fém lábvért"] },
    ],
  },
];

function describe(name: string): string {
  return `${name} lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.`;
}

async function seedSlot(label: string, maxCapacity: number): Promise<number> {
  const slot = await db.slot.upsert({
    where: { label },
    update: { maxCapacity },
    create: { label, maxCapacity },
  });
  return slot.id;
}

async function seedEquipmentType(
  type: SeedEquipmentType,
  sortOrder: number,
  parentId: number | null,
  inheritedSlotId: number | null,
  inheritedSlotCost: number | undefined
): Promise<void> {
  const slotId = type.slots === undefined ? inheritedSlotId : await seedSlot(type.label, type.slots);
  const slotCost = type.slotCost ?? inheritedSlotCost;
  const data = { parentId, slotId, icon: type.icon ?? null, sortOrder };

  const equipmentType = await db.equipmentType.upsert({
    where: { label: type.label },
    update: data,
    create: { label: type.label, ...data },
  });

  for (const name of type.items ?? []) {
    const equipmentSlotCost = slotId === null ? null : (slotCost ?? 1);
    await db.equipment.upsert({
      where: { name_typeId: { name, typeId: equipmentType.id } },
      update: { slotCost: equipmentSlotCost },
      create: { name, typeId: equipmentType.id, description: describe(name), slotCost: equipmentSlotCost },
    });
  }

  for (const [index, child] of (type.children ?? []).entries()) {
    await seedEquipmentType(child, index, equipmentType.id, slotId, slotCost);
  }
}

export async function seedEquipment(): Promise<void> {
  for (const [index, root] of equipmentTypes.entries()) {
    await seedEquipmentType(root, index, null, null, undefined);
  }
}
