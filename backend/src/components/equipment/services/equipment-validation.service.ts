export interface EquipmentValidationService {
    allExist: (ids: number[]) => Promise<boolean>;
}
