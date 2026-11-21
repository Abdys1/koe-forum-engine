import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { toEquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/mapper";
import { EquipmentTypeModification, EquipmentTypeModificationResult, ModifyEquipmentTypeInput, ModifyEquipmentTypeOutput } from "@src/components/equipment-type/usecases/modification/types";
import { RepositoryProvider } from "@src/components/transaction/types";

// TODO A módosítás jelenleg csak a label-t kezeli. Még kell:
//  - A ModifyEquipmentTypeInput, az EquipmentTypeUpdate és a repository update bővítése
//    a sortOrder és az icon mezőkkel; a PUT validációinak és OpenAPI leírásának bővítése.
//    A létrehozás validációi és hibakódjai (EQUIPMENT_TYPE_SORT_ORDER_INVALID,
//    EQUIPMENT_TYPE_ICON_INVALID) újrahasznosíthatók.
//  - A parentId és a slotId szándékosan nem módosítható: ezeket a típus törlésével és új
//    létrehozásával lehet megváltoztatni. A törlés csak gyerek és hozzárendelt felszerelés nélküli
//    típusnál engedélyezett, így a használatban lévő típusok szülője és slotja nem változhat meg,
//    ami védi a karakterek meglévő felszerelését (nincs körkialakulás, nincs kapacitástúllépés).
export default class EquipmentTypeModificationImpl implements EquipmentTypeModification {
    private equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>;

    constructor(equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>) {
        this.equipmentTypeRepositories = equipmentTypeRepositories;
    }

    public execute = async (input: ModifyEquipmentTypeInput): Promise<ModifyEquipmentTypeOutput> => {
        const label = input.label.trim();

        const currentType = await this.equipmentTypeRepositories.get().findById(input.id);
        if (!currentType) {
            return { status: EquipmentTypeModificationResult.NOT_FOUND };
        }

        // A saját, változatlan label-jére mentés nem ütközés, ezért a találat
        // id-jét is vizsgálni kell, nem csak azt, hogy van-e találat.
        const typeWithLabel = await this.equipmentTypeRepositories.get().findByLabelIgnoreCase(label);
        if (typeWithLabel && typeWithLabel.id !== input.id) {
            return { status: EquipmentTypeModificationResult.ALREADY_EXISTS };
        }

        const equipmentType = await this.equipmentTypeRepositories.get().update(input.id, { label });
        return { status: EquipmentTypeModificationResult.UPDATED, equipmentType: toEquipmentTypeDetails(equipmentType) };
    };
}
