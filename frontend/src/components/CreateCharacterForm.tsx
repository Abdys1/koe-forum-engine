"use client"

import { useState } from "react";
import { FormContextState, MultiStepFormContext } from "@/components/MultiStepFormContext";
import CharacterRaceStep from "@/components/create-character-forms/CharacterRaceStep";
import CharacterBasicsStep from "@/components/create-character-forms/CharacterBasicsStep";
import CharacterGearStep from "@/components/create-character-forms/CharacterGearStep";
import CharacterImageStep from "@/components/create-character-forms/CharacterImageStep";
import CharacterSummaryStep from "@/components/create-character-forms/CharacterSummaryStep";
import { FormStep } from "@/components/types";

const steps:FormStep[] = [
    {
        label: "Faj",
        formComponent: <CharacterRaceStep/>
    },
    {
        label: "Alapok",
        formComponent: <CharacterBasicsStep/>
    },
    {
        label: "Felszerelés",
        formComponent: <CharacterGearStep/>
    },
    {
        label: "Karakterkép",
        formComponent: <CharacterImageStep/>
    },
    {
        label: "Áttekintés",
        formComponent: <CharacterSummaryStep/>
    }
];


export default function CreateCharacterForm() {
    const [actualStep, setActualStep] = useState(4);

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