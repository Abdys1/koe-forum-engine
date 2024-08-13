"use client"

import { useState } from "react";
import { FormContextState, MultiStepFormContext } from "@/components/MultiStepFormContext";
import CharacterRaceStep from "@/components/create-character-forms/CharacterRaceStep";
import CharacterBasicsStep, { SelectableSex } from "@/components/create-character-forms/CharacterBasicsStep";
import CharacterGearStep, { DEFAULT_GEAR_OPTION } from "@/components/create-character-forms/CharacterGearStep";
import CharacterImageStep from "@/components/create-character-forms/CharacterImageStep";
import CharacterSummaryStep from "@/components/create-character-forms/CharacterSummaryStep";
import { FormStep } from "@/components/types";
import { useForm } from "react-hook-form";

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
    const [actualStep, setActualStep] = useState(0);

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

    const steps:FormStep[] = [
        {
            label: "Faj",
            formComponent: <CharacterRaceStep form={form}/>
        },
        {
            label: "Alapok",
            formComponent: <CharacterBasicsStep form={form}/>
        },
        {
            label: "Felszerelés",
            formComponent: <CharacterGearStep form={form}/>
        },
        {
            label: "Karakterkép",
            formComponent: <CharacterImageStep form={form}/>
        },
        {
            label: "Áttekintés",
            formComponent: <CharacterSummaryStep form={form}/>
        }
    ];

    function nextStep() {
        setActualStep(actualStep + 1);
    }

    function prevStep() {
        setActualStep(actualStep - 1);
    }

    const formState:FormContextState = {
        actualStep: actualStep,
        steps: steps,
        onPrevStep: prevStep,
        onNextStep: nextStep
    };

    return (
        <>
        <MultiStepFormContext.Provider value={formState}>
            {
                steps[actualStep].formComponent
            }
        </MultiStepFormContext.Provider>
        </>
    );
};