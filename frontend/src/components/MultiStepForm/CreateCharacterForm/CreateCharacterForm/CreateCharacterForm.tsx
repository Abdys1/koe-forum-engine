"use client"

import CharacterRaceStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceStep/CharacterRaceStep";
import CharacterBasicsStep, { SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import CharacterGearStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterGearStep/CharacterGearStep";
import CharacterImageStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterImageStep/CharacterImageStep";
import CreateCharacterHeader from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterHeader/CreateCharacterHeader";
import CharacterSummaryStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterSummaryStep/CharacterSummaryStep";
import { useMemo } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import MultiStepForm from "@/components/MultiStepForm/MultiStepForm/MultiStepForm";
import { findRace, races } from "@/dummydata/races";
import { raceStepBg, gearStepBg } from "@/styles/shared.css";
import { createCharacter } from "@/app/character/create/actions";
import { EquipmentCatalogData } from "@/lib/api/equipment/types";
import { sexMapping } from "@/lib/character";
import { compactSelection } from "@/lib/equipment";
import { buildEquipmentCatalog } from "@/lib/equipmentCatalog";
import { toGearOverview } from "@/lib/gearOverview";

export interface CharacterInputs {
    raceId: string,
    raceTitle: string,
    characterName: string,
    characterSex: SelectableSex,
    equipmentIds: number[],
    characterImg: FileList
}

type CreateCharacterFormProps = {
    equipmentCatalogData: EquipmentCatalogData
}

export default function CreateCharacterForm({ equipmentCatalogData }: CreateCharacterFormProps) {
    const form = useForm<CharacterInputs>({
        defaultValues: {
            raceId: races[0].id,
            raceTitle: races[0].title,
            characterSex: "ferfi",
            equipmentIds: []
        }
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
        const formData = new FormData();
        formData.append("name", values.characterName);
        formData.append("sex", String(sexMapping[values.characterSex]));
        formData.append("race", values.raceId);
        formData.append("image", values.characterImg[0]);
        values.equipmentIds.forEach(equipmentId => formData.append("equipmentIds", String(equipmentId)));

        const result = await createCharacter(formData);
        if (!result.success) {
            console.error(result.errorCodes);
        }
    };

    return (
        <MultiStepForm form={form} header={<CreateCharacterHeader control={form.control}/>} onSubmit={submit}>
            <MultiStepForm.Step label="Faj" style={raceStepStyle} className={raceStepBg}>
                <CharacterRaceStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Identitás"
                                validate={() => form.trigger('characterName', { shouldFocus: true })}
                                complete={!!characterName?.trim()}
                                style={raceStepStyle}
                                className={raceStepBg}>
                <CharacterBasicsStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Felszerelés" className={gearStepBg}>
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
