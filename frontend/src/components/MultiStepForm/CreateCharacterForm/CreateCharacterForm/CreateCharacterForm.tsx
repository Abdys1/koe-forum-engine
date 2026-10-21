"use client"

import CharacterRaceStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceStep/CharacterRaceStep";
import CharacterBasicsStep, { SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import CharacterGearStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterGearStep/CharacterGearStep";
import CharacterImageStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterImageStep/CharacterImageStep";
import CharacterPreview from "@/components/MultiStepForm/CreateCharacterForm/CharacterPreview/CharacterPreview";
import CharacterSummaryStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterSummaryStep/CharacterSummaryStep";
import { useForm, useWatch } from "react-hook-form";
import MultiStepForm from "@/components/MultiStepForm/MultiStepForm/MultiStepForm";
import { findRace, races } from "@/dummydata/races";
import { raceStepBg, gearStepBg } from "@/styles/shared.css";

export interface CharacterInputs {
    raceId: string,
    raceTitle: string,
    characterName: string,
    characterSex: SelectableSex,
    equipmentIds: string[],
    characterImg: FileList
}

export default function CreateCharacterForm() {
    const form = useForm<CharacterInputs>({
        defaultValues: {
            raceId: races[0].id,
            raceTitle: races[0].title,
            characterSex: "ferfi",
            equipmentIds: []
        }
    });

    const raceId = useWatch({ control: form.control, name: "raceId" });
    const characterName = useWatch({ control: form.control, name: "characterName" });
    const characterImg = useWatch({ control: form.control, name: "characterImg" });
    const raceStepStyle = { '--raceUrl': `url('${findRace(raceId).img}')` } as React.CSSProperties;

    return (
        <MultiStepForm form={form} aside={<CharacterPreview control={form.control}/>}>
            <MultiStepForm.Step label="Faj" style={raceStepStyle} className={raceStepBg}>
                <CharacterRaceStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Identitás"
                                validate={() => form.trigger('characterName', { shouldFocus: true })}
                                canProceed={!!characterName?.trim()}
                                style={raceStepStyle}
                                className={raceStepBg}>
                <CharacterBasicsStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Felszerelés" className={gearStepBg}>
               <CharacterGearStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Karakterkép" validate={() => form.trigger('characterImg')} complete={!!characterImg?.length}>
                <CharacterImageStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Áttekintés" hideAside>
                <CharacterSummaryStep/>
            </MultiStepForm.Step>
        </MultiStepForm>
    );
}
