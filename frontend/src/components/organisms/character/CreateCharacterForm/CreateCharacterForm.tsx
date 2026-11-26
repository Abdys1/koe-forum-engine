"use client"

import CreateCharacterWizard from "@/components/organisms/character/CreateCharacterForm/CreateCharacterWizard";
import { useCharacterCreation } from "@/features/character/hooks/useCharacterCreation";
import { useCreateCharacterSubmit } from "@/features/character/hooks/useCreateCharacterSubmit";
import type { Equipment, EquipmentType } from "@/lib/api/equipment/types";

type CreateCharacterFormProps = {
    equipmentTypes: EquipmentType[],
    equipment: Equipment[]
}

export default function CreateCharacterForm({ equipmentTypes, equipment }: CreateCharacterFormProps) {
    const creation = useCharacterCreation(equipmentTypes, equipment);
    const submit = useCreateCharacterSubmit(creation.applyServerErrors);

    return <CreateCharacterWizard creation={creation} onSubmit={submit}/>;
}
