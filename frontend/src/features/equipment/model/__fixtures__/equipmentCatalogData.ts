import type { EquipmentCatalogData, EquipmentType } from "@/lib/api/equipment/types";

const weapon: EquipmentType = { id: 10, label: "Fegyver", slotId: 1, parentId: null, icon: "swords", sortOrder: 0 };
const sword: EquipmentType = { id: 11, label: "Kard", slotId: 1, parentId: 10, icon: null, sortOrder: 0 };
const shield: EquipmentType = { id: 12, label: "Pajzs", slotId: 2, parentId: 10, icon: null, sortOrder: 1 };
const clothing: EquipmentType = { id: 20, label: "Ruházat", slotId: null, parentId: null, icon: "checkroom", sortOrder: 1 };
const cloak: EquipmentType = { id: 21, label: "Köpeny", slotId: null, parentId: 20, icon: null, sortOrder: 0 };

export const equipmentCatalogData: EquipmentCatalogData = {
    equipmentTypes: [weapon, sword, shield, clothing, cloak],
    slots: [
        { id: 1, label: "Fegyverek", maxCapacity: 4 },
        { id: 2, label: "Pajzs", maxCapacity: 1 }
    ],
    equipments: [
        { id: 100, name: "Rövidkard", description: "", slotCost: 1, type: sword },
        { id: 101, name: "Kétkezes kard", description: "", slotCost: 4, type: sword },
        { id: 102, name: "Tőr", description: "", slotCost: 2, type: weapon },
        { id: 103, name: "Kerek pajzs", description: "", slotCost: 1, type: shield },
        { id: 104, name: "Gyapjúköpeny", description: "", slotCost: null, type: cloak }
    ]
};
