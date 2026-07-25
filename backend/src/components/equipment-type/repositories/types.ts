import { EquipmentTypeEntity } from "@src/components/equipment-type/models/equipment-type";

export interface EquipmentTypeRepository {
    findAll: () => Promise<EquipmentTypeEntity[]>,
    findById: (id: number) => Promise<EquipmentTypeEntity | null>,
    /**
     * A label egyszerre megjelenített név és egyedi azonosító, ezért az egyediséget
     * kis-nagybetűtől függetlenül kell vizsgálni: `Pajzs` és `pajzs` nem lehet két típus.
     */
    findByLabelIgnoreCase: (label: string) => Promise<EquipmentTypeEntity | null>,
    /**
     * A típusra hivatkozó felszerelések száma. Az `Equipment` táblát kérdezi, tehát
     * egy másik komponens adatát — a törlés-tiltáshoz viszont erre van szükség, és a
     * repository réteg amúgy is a Prisma kliensen dolgozik.
     */
    countEquipmentByTypeId: (id: number) => Promise<number>,
    create: (equipmentType: EquipmentTypeEntity) => Promise<EquipmentTypeEntity>,
    update: (id: number, label: string) => Promise<EquipmentTypeEntity>,
    delete: (id: number) => Promise<void>
}
