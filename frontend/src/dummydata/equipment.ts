export interface EquipmentItem {
    id: string,
    name: string
}

export interface EquipmentType {
    id: string,
    label: string,
    icon?: "swords" | "shield",
    slots?: number,
    slotCost?: number,
    children?: EquipmentType[],
    items?: EquipmentItem[]
}

export const equipmentTypes: EquipmentType[] = [
    {
        id: 'fegyverzet',
        label: 'Fegyverzet',
        icon: 'swords',
        slots: 5,
        children: [
            {
                id: 'kardok',
                label: 'Kardok',
                slotCost: 1,
                items: [
                    { id: 'rovidkard', name: 'Rövidkard' },
                    { id: 'hosszukard', name: 'Hosszúkard' }
                ]
            },
            {
                id: 'szablyak',
                label: 'Szablyák',
                slotCost: 1,
                items: [
                    { id: 'kalozszablya', name: 'Kalóz szablya' },
                    { id: 'huszarszablya', name: 'Huszár szablya' },
                    { id: 'langoloszablya', name: 'Mágikus lángoló szablya' },
                    { id: 'lovassagiszablya', name: 'Lovassági szablya' },
                    { id: 'tisztiszablya', name: 'Tiszti díszszablya' },
                    { id: 'sivatagiszablya', name: 'Sivatagi görbe szablya' },
                    { id: 'kalandozoszablya', name: 'Kalandozó szablya' }
                ]
            },
            {
                id: 'baltak',
                label: 'Balták és bárdok',
                slotCost: 2,
                items: [
                    { id: 'fokos', name: 'Fokos' },
                    { id: 'csatabard', name: 'Csatabárd' }
                ]
            },
            {
                id: 'landzsak',
                label: 'Lándzsák',
                slotCost: 2,
                items: [
                    { id: 'landzsa', name: 'Lándzsa' },
                    { id: 'hajitolandzsa', name: 'Hajítólándzsa' }
                ]
            },
            {
                id: 'pajzsok',
                label: 'Pajzsok',
                slotCost: 1,
                items: [
                    { id: 'kerekfapajzs', name: 'Kerek fapajzs' },
                    { id: 'okolpajzs', name: 'Ökölpajzs' }
                ]
            }
        ]
    },
    {
        id: 'pancelzat',
        label: 'Páncélzat',
        icon: 'shield',
        children: [
            {
                id: 'sisakok',
                label: 'Sisakok',
                slots: 1,
                slotCost: 1,
                items: [
                    { id: 'borsisak', name: 'Nyitott bőrsisak' },
                    { id: 'fazeksisak', name: 'Fazéksisak' },
                    { id: 'vaskalap', name: 'Vaskalap' }
                ]
            },
            {
                id: 'vertek',
                label: 'Vértek',
                slots: 1,
                slotCost: 1,
                items: [
                    { id: 'gambeson', name: 'Gambeson' },
                    { id: 'borvert', name: 'Bőrvért' },
                    { id: 'lamellasvert', name: 'Lamellás vért' }
                ]
            },
            {
                id: 'karvedok',
                label: 'Karvédők',
                slots: 2,
                slotCost: 1,
                items: [
                    { id: 'pancelkesztyu', name: 'Páncélkesztyű' },
                    { id: 'borkesztyu', name: 'Bőrkesztyű' },
                    { id: 'femalkarvedo', name: 'Fém alkarvédő' },
                    { id: 'boralkarvedo', name: 'Bőr alkarvédő' }
                ]
            },
            {
                id: 'labvertek',
                label: 'Lábvértek',
                slots: 1,
                slotCost: 1,
                items: [
                    { id: 'borlabvert', name: 'Bőr lábvért' },
                    { id: 'femlabvert', name: 'Fém lábvért' }
                ]
            }
        ]
    }
];
