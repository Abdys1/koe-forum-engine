import { useMemo } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";

import { CharacterInputs, createCharacterDefaults } from "@/features/character/model/createCharacter";
import { findRace, SelectableRace } from "@/features/character/model/race";
import { buildEquipmentCatalog, EquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { GearOverviewRoot, toGearOverview } from "@/features/equipment/model/gearOverview";
import { compactSelection } from "@/features/equipment/model/selection";
import { EquipmentCatalogData } from "@/lib/api/equipment/types";

export interface CharacterCreation {
    form: UseFormReturn<CharacterInputs>,
    equipmentCatalog: EquipmentCatalog,
    gearOverview: GearOverviewRoot[],
    selectedRace: SelectableRace,
    isNameComplete: boolean,
    isImageComplete: boolean,
    validateName: () => Promise<boolean>,
    validateImage: () => Promise<boolean>
}

export function useCharacterCreation(equipmentCatalogData: EquipmentCatalogData): CharacterCreation {
    const form = useForm<CharacterInputs>({ defaultValues: createCharacterDefaults });
    const equipmentCatalog = useMemo(() => buildEquipmentCatalog(equipmentCatalogData), [equipmentCatalogData]);

    const [raceId, characterName, characterImg, equipmentIds] = useWatch({
        control: form.control,
        name: ["raceId", "characterName", "characterImg", "equipmentIds"]
    });
    const gearOverview = useMemo(
        () => toGearOverview(
            equipmentCatalog.getEquipmentTypeRoots(),
            equipmentCatalog.getSlotPoolUsages(compactSelection(equipmentIds))
        ),
        [equipmentCatalog, equipmentIds]
    );

    return {
        form,
        equipmentCatalog,
        gearOverview,
        selectedRace: findRace(raceId),
        isNameComplete: !!characterName?.trim(),
        isImageComplete: !!characterImg?.length,
        validateName: () => form.trigger("characterName", { shouldFocus: true }),
        validateImage: () => form.trigger("characterImg")
    };
}
