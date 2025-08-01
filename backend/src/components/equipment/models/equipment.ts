export interface EquipmentEntity {
    id?: number;
    name: string;
    type: EquipmentType;
    description: string;
}

export enum EquipmentType {
    PRIMARY_WEAPON = 'PRIMARY_WEAPON',
    SECONDARY_WEAPON = 'SECONDARY_WEAPON',
    HELMET = 'HELMET',
    BODY_ARMOR = 'BODY_ARMOR',
    SECONDARY_ARMOR = 'SECONDARY_ARMOR',
    SHIELD = 'SHIELD'
}