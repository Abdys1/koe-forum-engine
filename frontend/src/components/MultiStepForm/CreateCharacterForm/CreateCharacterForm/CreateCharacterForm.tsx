"use client"

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import CharacterBasicsStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import CharacterGearStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterGearStep/CharacterGearStep";
import CharacterImageStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterImageStep/CharacterImageStep";
import CharacterRaceStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceStep/CharacterRaceStep";
import CharacterSummaryStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterSummaryStep/CharacterSummaryStep";
import CreateCharacterHeader from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterHeader/CreateCharacterHeader";
import MultiStepForm from "@/components/MultiStepForm/MultiStepForm/MultiStepForm";
import { createCharacter } from "@/features/character/actions/createCharacter";
import { CharacterInputs, createCharacterDefaults, toCreateCharacterFormData } from "@/features/character/model/createCharacter";
import { findRace } from "@/features/character/model/race";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { toGearOverview } from "@/features/equipment/model/gearOverview";
import { compactSelection } from "@/features/equipment/model/selection";
import { EquipmentCatalogData } from "@/lib/api/equipment/types";

import * as styles from "./CreateCharacterForm.css";

type CreateCharacterFormProps = {
    equipmentCatalogData: EquipmentCatalogData
}

export default function CreateCharacterForm({ equipmentCatalogData }: CreateCharacterFormProps) {
    const router = useRouter();
    const form = useForm<CharacterInputs>({
        defaultValues: createCharacterDefaults
    });

    const equipmentCatalog = useMemo(() => buildEquipmentCatalog(equipmentCatalogData), [equipmentCatalogData]);

    const raceId = useWatch({ control: form.control, name: "raceId" });
    const characterName = useWatch({ control: form.control, name: "characterName" });
    const characterImg = useWatch({ control: form.control, name: "characterImg" });
    const equipmentIds = useWatch({ control: form.control, name: "equipmentIds" });
    const gearOverview = useMemo(
        () => toGearOverview(
            equipmentCatalog.getEquipmentTypeRoots(),
            equipmentCatalog.getSlotPoolUsages(compactSelection(equipmentIds))
        ),
        [equipmentCatalog, equipmentIds]
    );
    const raceStepStyle = { '--raceUrl': `url('${findRace(raceId).img}')` } as React.CSSProperties;

    const submit: SubmitHandler<CharacterInputs> = async values => {
        const result = await createCharacter(toCreateCharacterFormData(values));
        if (!result.success) {
            console.error(result.errorCodes);
            return;
        }
        router.push(`/character/${result.characterId}`);
    };

    return (
        <MultiStepForm form={form} header={<CreateCharacterHeader control={form.control}/>} onSubmit={submit}>
            <MultiStepForm.Step label="Faj" style={raceStepStyle} className={styles.raceStepBg}>
                <CharacterRaceStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Identitás"
                                validate={() => form.trigger('characterName', { shouldFocus: true })}
                                complete={!!characterName?.trim()}
                                style={raceStepStyle}
                                className={styles.raceStepBg}>
                <CharacterBasicsStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Felszerelés" className={styles.gearStepBg}>
               <CharacterGearStep equipmentCatalog={equipmentCatalog}/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Karakterkép" validate={() => form.trigger('characterImg')} complete={!!characterImg?.length}>
                <CharacterImageStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Áttekintés">
                <CharacterSummaryStep gearOverview={gearOverview}/>
            </MultiStepForm.Step>
        </MultiStepForm>
    );
}
