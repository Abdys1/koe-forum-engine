export interface EquipmentExistenceValidationUseCase {
    execute: (ids: number[]) => Promise<boolean>;
}

export interface SlotCapacityValidationUseCase {
    execute: (equipmentIds: number[]) => Promise<boolean>;
}
