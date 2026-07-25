import { EquipmentEntity } from "@src/components/equipment/models/equipment";

export interface EquipmentRepository {
    findAll: () => Promise<EquipmentEntity[]>,
    findAllByIds: (ids: number[]) => Promise<EquipmentEntity[]>,
    findById: (id: number) => Promise<EquipmentEntity | null>,
    findByNameAndTypeId: (name: string, typeId: number) => Promise<EquipmentEntity | null>,
    /**
     * A felszerelésre mutató karakter-hozzárendelések száma. A `CharacterEquipment`
     * táblát kérdezi — a törlés-tiltáshoz kell, és mivel egy felszerelés ugyanahhoz a
     * karakterhez többször is hozzárendelhető, a tiltás létezés-alapú (`> 0`).
     */
    countAssignmentsByEquipmentId: (id: number) => Promise<number>,
    /**
     * Létezik-e a megadott felszerelés-típus. Az `EquipmentType` táblát kérdezi, a
     * `countAssignmentsByEquipmentId`-vel egy elv alapján: a repository réteg
     * olvashat másik komponens tábláját, a use case-ek viszont csak a saját
     * komponensük repository-ját ismerik.
     */
    existsTypeById: (typeId: number) => Promise<boolean>,
    create: (equipment: EquipmentEntity) => Promise<EquipmentEntity>,
    update: (id: number, equipment: EquipmentEntity) => Promise<EquipmentEntity>,
    delete: (id: number) => Promise<void>
}
