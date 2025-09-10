import { EquipmentType } from "@prisma/client";
import { db } from "@src/prisma-client";

const equipment = [
  {
    name: "Hosszúkard",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "A hosszúkard lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rövidkard",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "Rövidkard ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fokos",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "A fokos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pöröly",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "A pöröly lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Csatabárd",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "Csatabárddal lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lándzsa",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "A lándzsa lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Szegecses kesztyű",
    type: EquipmentType.PRIMARY_WEAPON,
    description:
      "Vedd fel a kesztyűt vagy lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Szablya",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "A szablya lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rövidkard",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "Rövidkard ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fokos",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "A fokos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pöröly",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "A pöröly lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Csatabárd",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "Csatabárddal lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lándzsa",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "A lándzsa lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Szegecses kesztyű",
    type: EquipmentType.SECONDARY_WEAPON,
    description:
      "Vedd fel a kesztyűt vagy lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Kerek fapajzs",
    type: EquipmentType.SHIELD,
    description:
      "Kerek fapajzs lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Ökölpajzs",
    type: EquipmentType.SHIELD,
    description:
      "Ökölpajzs lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Sodronying",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A sordonying lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Gambeson",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A gambeson adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott bőrvért",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A bőrvért lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott bőrvért csataszoknyával",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A bőrvért szoknyával is lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott bőrvért vállvérttel",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A bőrvért vállvérttel is lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pikkelyes bőrvért",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A pikkelyes lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Pikkelyes bőrvért vállvérttel",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A pikkelyes vállvérttel is lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lamellás vért",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A lamellás lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Lemezvért",
    type: EquipmentType.BODY_ARMOR,
    description:
      "Lemezes lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott lemezvért",
    type: EquipmentType.BODY_ARMOR,
    description:
      "Rákozott lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákozott lemezvért csataszoknyával",
    type: EquipmentType.BODY_ARMOR,
    description:
      "Rákozott lemez szoknyával adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Teljes gyalogos páncél",
    type: EquipmentType.BODY_ARMOR,
    description:
      "Valaki nagyon kemény talpas lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Teljes lovagi páncél",
    type: EquipmentType.BODY_ARMOR,
    description:
      "A lova se bírja el lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőr alkarvért",
    type: EquipmentType.SECONDARY_ARMOR,
    description:
      "Alkaron bőr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőr lábvért",
    type: EquipmentType.SECONDARY_ARMOR,
    description:
      "Lábszáron bőr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőr alkar és lábvért",
    type: EquipmentType.SECONDARY_ARMOR,
    description:
      "Mindenhol bőr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fém alkarvért",
    type: EquipmentType.SECONDARY_ARMOR,
    description:
      "Alkaron fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fém lábvért",
    type: EquipmentType.SECONDARY_ARMOR,
    description:
      "A lábszáron fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fém alkar és lábvért",
    type: EquipmentType.SECONDARY_ARMOR,
    description:
      "Mindenhol fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Nyitott bőrsisak",
    type: EquipmentType.HELMET,
    description:
      "A nyitott lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Bőrsisak orrvédővel",
    type: EquipmentType.HELMET,
    description:
      "Orrvédős lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Nyitott fémsisak",
    type: EquipmentType.HELMET,
    description:
      "A nyitott fém lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Nyitott fémsisak orrvédővel",
    type: EquipmentType.HELMET,
    description:
      "A fém orr lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Fazéksisak",
    type: EquipmentType.HELMET,
    description:
      "A fazék lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Vaskalap",
    type: EquipmentType.HELMET,
    description:
      "Vaskalapos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
  {
    name: "Rákfarkas sisak",
    type: EquipmentType.HELMET,
    description:
      "Most akkor rák vagy farkas lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.",
  },
];

export async function seedEquipment() {
  for (const item of equipment) {
    await db.equipment.upsert({
      where: { name_type: { name: item.name, type: item.type } },
      update: {},
      create: {
        name: item.name,
        type: item.type,
        description: item.description,
      },
    });
  }
}
