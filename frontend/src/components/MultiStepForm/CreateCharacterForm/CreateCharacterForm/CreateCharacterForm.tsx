"use client"

import CharacterRaceStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceStep/CharacterRaceStep";
import CharacterBasicsStep, { SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import CharacterGearStep, { DEFAULT_GEAR_OPTION } from "@/components/MultiStepForm/CreateCharacterForm/CharacterGearStep/CharacterGearStep";
import CharacterImageStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterImageStep/CharacterImageStep";
import CharacterSummaryStep from "@/components/MultiStepForm/CreateCharacterForm/CharacterSummaryStep/CharacterSummaryStep";
import { useForm } from "react-hook-form";
import MultiStepForm from "@/components/MultiStepForm/MultiStepForm/MultiStepForm";
import { raceStepBg, gearStepBg } from "@/styles/shared.css";

export interface CharacterInputs {
    raceId: string,
    raceTitle: string,
    characterName: string,
    charaterSex: SelectableSex,
    primaryWeaponTitle: string,
    secondaryWeaponTitle: string,
    shieldTitle: string,
    bodyArmorTitle: string,
    secondaryArmorTitle: string,
    helmetTitle: string,
    characterImg: FileList
}

export default function CreateCharacterForm() {
    const form = useForm<CharacterInputs>({
        defaultValues: {
            charaterSex: "ferfi",
            primaryWeaponTitle: DEFAULT_GEAR_OPTION,
            secondaryWeaponTitle: DEFAULT_GEAR_OPTION,
            shieldTitle: DEFAULT_GEAR_OPTION,
            bodyArmorTitle: DEFAULT_GEAR_OPTION,
            secondaryArmorTitle: DEFAULT_GEAR_OPTION,
            helmetTitle: DEFAULT_GEAR_OPTION
        }
    });

    return (
        <MultiStepForm form={form}>
            <MultiStepForm.Step label="Faj" style={{'--raceUrl': `url('/images/ryldan-nobg.png')`} as React.CSSProperties} className={raceStepBg}>
                <CharacterRaceStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Alapok"
                                validate={() => form.trigger('characterName', { shouldFocus: true })}
                                style={{'--raceUrl': `url('/images/ryldan-nobg.png')`} as React.CSSProperties}
                                className={raceStepBg}>
                <CharacterBasicsStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Felszerelés" className={gearStepBg}>
               <CharacterGearStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Karakterkép" validate={() => form.trigger('characterImg')}>
                <CharacterImageStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Áttekintés">
                <CharacterSummaryStep/>
            </MultiStepForm.Step>
        </MultiStepForm>
    );
}
