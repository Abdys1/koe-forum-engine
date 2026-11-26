import type { Equipment, EquipmentType } from "@/lib/api/equipment/types";

const weaponSlot = { id: 1, label: "Fegyverek", maxCapacity: 4 };
const shieldSlot = { id: 2, label: "Pajzs", maxCapacity: 1 };

const weapon: EquipmentType = { id: 10, label: "Fegyver", slot: weaponSlot, parentId: null, icon: "swords", sortOrder: 0 };
const sword: EquipmentType = { id: 11, label: "Kard", slot: weaponSlot, parentId: 10, icon: null, sortOrder: 0 };
const shield: EquipmentType = { id: 12, label: "Pajzs", slot: shieldSlot, parentId: 10, icon: null, sortOrder: 1 };
const clothing: EquipmentType = { id: 20, label: "Ruházat", slot: null, parentId: null, icon: "checkroom", sortOrder: 1 };
const cloak: EquipmentType = { id: 21, label: "Köpeny", slot: null, parentId: 20, icon: null, sortOrder: 0 };

export const equipmentTypes: EquipmentType[] = [weapon, sword, shield, clothing, cloak];

export const equipment: Equipment[] = [
    { id: 100, name: "Rövidkard", description: "", slotCost: 1, typeId: sword.id },
    { id: 101, name: "Kétkezes kard", description: "", slotCost: 4, typeId: sword.id },
    { id: 102, name: "Tőr", description: "", slotCost: 2, typeId: weapon.id },
    { id: 103, name: "Kerek pajzs", description: "", slotCost: 1, typeId: shield.id },
    { id: 104, name: "Gyapjúköpeny", description: "", slotCost: null, typeId: cloak.id }
];
