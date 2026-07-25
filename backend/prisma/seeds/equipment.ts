import { db } from "@src/prisma-client";

/**
 * A 6 alaptípus megjelenített neve. A kulcsok a korábbi Prisma enum értékei —
 * csak a seed olvashatóságát segítik, a DB-ben egyedül a label azonosít.
 */
export const EquipmentTypeLabels = {
  PRIMARY_WEAPON: "Elsődleges fegyver",
  SECONDARY_WEAPON: "Másodlagos fegyver",
  HELMET: "Fejvédő",
  BODY_ARMOR: "Testpáncél",
  SECONDARY_ARMOR: "Másodlagos páncél",
  SHIELD: "Pajzs",
} as const;

const equipment = [
  {
    name: "Hosszúkard",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "A hosszúkard lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rövidkard",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "Rövidkard ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fokos",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "A fokos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pöröly",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "A pöröly lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Csatabárd",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "Csatabárddal lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lándzsa",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "A lándzsa lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Szegecses kesztyű",
    type: EquipmentTypeLabels.PRIMARY_WEAPON,
    description:
      "Vedd fel a kesztyűt vagy lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Szablya",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "A szablya lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rövidkard",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "Rövidkard ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fokos",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "A fokos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pöröly",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "A pöröly lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Csatabárd",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "Csatabárddal lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lándzsa",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "A lándzsa lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Szegecses kesztyű",
    type: EquipmentTypeLabels.SECONDARY_WEAPON,
    description:
      "Vedd fel a kesztyűt vagy lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Kerek fapajzs",
    type: EquipmentTypeLabels.SHIELD,
    description:
      "Kerek fapajzs lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Ökölpajzs",
    type: EquipmentTypeLabels.SHIELD,
    description:
      "Ökölpajzs lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Sodronying",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A sordonying lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Gambeson",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A gambeson adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott bőrvért",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A bőrvért lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott bőrvért csataszoknyával",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A bőrvért szoknyával is lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott bőrvért vállvérttel",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A bőrvért vállvérttel is lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pikkelyes bőrvért",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A pikkelyes lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pikkelyes bőrvért vállvérttel",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A pikkelyes vállvérttel is lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lamellás vért",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A lamellás lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lemezvért",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "Lemezes lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott lemezvért",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "Rákozott lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott lemezvért csataszoknyával",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "Rákozott lemez szoknyával adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Teljes gyalogos páncél",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "Valaki nagyon kemény talpas lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Teljes lovagi páncél",
    type: EquipmentTypeLabels.BODY_ARMOR,
    description:
      "A lova se bírja el lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőr alkarvért",
    type: EquipmentTypeLabels.SECONDARY_ARMOR,
    description:
      "Alkaron bőr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőr lábvért",
    type: EquipmentTypeLabels.SECONDARY_ARMOR,
    description:
      "Lábszáron bőr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőr alkar és lábvért",
    type: EquipmentTypeLabels.SECONDARY_ARMOR,
    description:
      "Mindenhol bőr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fém alkarvért",
    type: EquipmentTypeLabels.SECONDARY_ARMOR,
    description:
      "Alkaron fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fém lábvért",
    type: EquipmentTypeLabels.SECONDARY_ARMOR,
    description:
      "A lábszáron fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fém alkar és lábvért",
    type: EquipmentTypeLabels.SECONDARY_ARMOR,
    description:
      "Mindenhol fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Nyitott bőrsisak",
    type: EquipmentTypeLabels.HELMET,
    description:
      "A nyitott lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőrsisak orrvédővel",
    type: EquipmentTypeLabels.HELMET,
    description:
      "Orrvédős lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Nyitott fémsisak",
    type: EquipmentTypeLabels.HELMET,
    description:
      "A nyitott fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Nyitott fémsisak orrvédővel",
    type: EquipmentTypeLabels.HELMET,
    description:
      "A fém orr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fazéksisak",
    type: EquipmentTypeLabels.HELMET,
    description:
      "A fazék lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Vaskalap",
    type: EquipmentTypeLabels.HELMET,
    description:
      "Vaskalapos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákfarkas sisak",
    type: EquipmentTypeLabels.HELMET,
    description:
      "Most akkor rák vagy farkas lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
];

export async function seedEquipmentTypes(): Promise<Map<string, number>> {
  const typeIdsByLabel = new Map<string, number>();
  for (const label of Object.values(EquipmentTypeLabels)) {
    const equipmentType = await db.equipmentType.upsert({
      where: { label },
      update: {},
      create: { label },
    });
    typeIdsByLabel.set(label, equipmentType.id);
  }
  return typeIdsByLabel;
}

export async function seedEquipment() {
  const typeIdsByLabel = await seedEquipmentTypes();
  for (const item of equipment) {
    const typeId = typeIdsByLabel.get(item.type);
    if (typeId === undefined) {
      throw new Error(`Nincs seedelt felszerelés-típus ehhez a label-hez: ${item.type}`);
    }
    await db.equipment.upsert({
      where: { name_typeId: { name: item.name, typeId } },
      update: {},
      create: {
        name: item.name,
        typeId,
        description: item.description,
      },
    });
  }
}
