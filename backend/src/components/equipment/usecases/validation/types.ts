export interface EquipmentExistenceValidation {
    execute: (ids: number[]) => Promise<boolean>;
}
