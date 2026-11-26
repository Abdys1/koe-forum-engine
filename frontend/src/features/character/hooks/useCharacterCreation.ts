import { useMemo } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";

import { checkCharacterName } from "@/features/character/actions/checkCharacterName";
import {
    characterErrorMessage,
    CharacterFormError,
    findCharacterNameError,
    isCharacterErrorCode
} from "@/features/character/model/characterValidation";
import { CharacterInputs, createCharacterDefaults } from "@/features/character/model/createCharacter";
import { buildEquipmentCatalog, EquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { buildGearOverview,GearOverviewRoot } from "@/features/equipment/model/gearOverview";
import { compactSelection } from "@/features/equipment/model/selection";
import { Equipment, EquipmentType } from "@/lib/api/equipment/types";
import type { Race } from "@/lib/api/race/types";

export interface CharacterCreation {
    form: UseFormReturn<CharacterInputs>,
    equipmentCatalog: EquipmentCatalog,
    gearOverview: GearOverviewRoot[],
    races: Race[],
    selectedRace: Race | undefined,
    isNameComplete: boolean,
    isImageComplete: boolean,
    validateName: () => Promise<boolean>,
    validateImage: () => Promise<boolean>,
    applyServerErrors: (errors: CharacterFormError[]) => void
}

export function useCharacterCreation(races: Race[], equipmentTypes: EquipmentType[], equipment: Equipment[]): CharacterCreation {
    const form = useForm<CharacterInputs>({ defaultValues: createCharacterDefaults(races), reValidateMode: "onSubmit" });
    const equipmentCatalog = useMemo(() => buildEquipmentCatalog(equipmentTypes, equipment), [equipmentTypes, equipment]);

    const [raceId, characterName, characterImg, equipmentIds] = useWatch({
        control: form.control,
        name: ["raceId", "characterName", "characterImg", "equipmentIds"]
    });
    const gearOverview = useMemo(
        () => buildGearOverview(
            equipmentCatalog.getEquipmentTypeRoots(),
            equipmentCatalog.getSlotPoolUsages(compactSelection(equipmentIds))
        ),
        [equipmentCatalog, equipmentIds]
    );

    return {
        form,
        equipmentCatalog,
        gearOverview,
        races,
        selectedRace: races.find(race => race.id === raceId),
        isNameComplete: !!characterName?.trim(),
        isImageComplete: !!characterImg?.length,
        validateName: async () => {
            if (!(await form.trigger("characterName", { shouldFocus: true }))) {
                return false;
            }
            const result = await checkCharacterName(form.getValues("characterName"));
            const errorCode = findCharacterNameError(result);
            const unhandledErrorCodes = result.success ? [] : result.errorCodes.filter(code => !isCharacterErrorCode(code));
            if (unhandledErrorCodes.length) {
                console.error(unhandledErrorCodes);
            }
            if (errorCode) {
                form.setError("characterName", { type: "server", message: characterErrorMessage(errorCode) }, { shouldFocus: true });
                return false;
            }
            return true;
        },
        validateImage: () => form.trigger("characterImg"),
        applyServerErrors: errors => errors.forEach(({ field, message }) =>
            form.setError(field, { type: "server", message }))
    };
}
