export interface EquipmentExistenceValidation {
    execute: (ids: number[]) => Promise<boolean>;
}

export interface SlotCapacityValidation {
    execute: (equipmentIds: number[]) => Promise<boolean>;
}
