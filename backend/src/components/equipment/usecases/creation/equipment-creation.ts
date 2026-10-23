import { EquipmentRepository } from "@src/components/equipment/repositories/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";
import { CreateEquipmentInput, CreateEquipmentOutput, EquipmentCreationResult, EquipmentCreationUseCase } from "@src/components/equipment/usecases/creation/types";
import { EquipmentTypeRepository } from "@src/components/equipment-type/repositories/types";
import { SlotRepository } from "@src/components/slot/repositories/types";
import { RepositoryProvider } from "@src/components/transaction/types";

export default class EquipmentCreationUseCaseImpl implements EquipmentCreationUseCase {
    constructor(
        private readonly equipmentRepositories: RepositoryProvider<EquipmentRepository>,
        private readonly equipmentTypeRepositories: RepositoryProvider<EquipmentTypeRepository>,
        private readonly slotRepositories: RepositoryProvider<SlotRepository>
    ) {}

    public execute = async (input: CreateEquipmentInput): Promise<CreateEquipmentOutput> => {
        const equipmentType = await this.equipmentTypeRepositories.get().findById(input.typeId);
        if (!equipmentType) {
            return { status: EquipmentCreationResult.TYPE_NOT_EXISTS };
        }

        const slot = equipmentType.slotId !== null && equipmentType.slotId !== undefined ? await this.slotRepositories.get().findById(equipmentType.slotId) : null;
        if (slot) {
            if (input.slotCost === undefined) {
                return { status: EquipmentCreationResult.SLOT_COST_REQUIRED };
            }
            if (input.slotCost > slot.maxCapacity) {
                return { status: EquipmentCreationResult.SLOT_COST_EXCEEDS_CAPACITY };
            }
        } else if (input.slotCost !== undefined) {
            return { status: EquipmentCreationResult.SLOT_COST_NOT_ALLOWED };
        }

        const existingEquipment = await this.equipmentRepositories.get().findByNameAndTypeId(input.name, input.typeId);
        if (existingEquipment) {
            return { status: EquipmentCreationResult.ALREADY_EXISTS };
        }

        const equipment = await this.equipmentRepositories.get().create({
            name: input.name,
            typeId: input.typeId,
            description: input.description,
            slotCost: input.slotCost ?? null
        });
        return { status: EquipmentCreationResult.CREATED, equipment: toEquipmentDetails(equipment) };
    };
}
