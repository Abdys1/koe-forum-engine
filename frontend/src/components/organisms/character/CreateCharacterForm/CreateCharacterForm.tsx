"use client"

import CreateCharacterWizard from "@/components/organisms/character/CreateCharacterForm/CreateCharacterWizard";
import { useCharacterCreation } from "@/features/character/hooks/useCharacterCreation";
import { useCreateCharacterSubmit } from "@/features/character/hooks/useCreateCharacterSubmit";
import type { EquipmentCatalogData } from "@/lib/api/equipment/types";

type CreateCharacterFormProps = {
    equipmentCatalogData: EquipmentCatalogData
}

export default function CreateCharacterForm({ equipmentCatalogData }: CreateCharacterFormProps) {
    const creation = useCharacterCreation(equipmentCatalogData);
    const submit = useCreateCharacterSubmit();

    return <CreateCharacterWizard creation={creation} onSubmit={submit}/>;
}
