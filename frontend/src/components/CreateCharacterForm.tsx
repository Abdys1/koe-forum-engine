"use client"

import { useState } from "react";
import { FormContextState, MultiStepFormContext } from "@/components/MultiStepFormContext";
import CharacterRaceStep from "@/components/create-character-forms/CharacterRaceStep";
import CharacterBasicsStep from "@/components/create-character-forms/CharacterBasicsStep";
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
        formComponent: <CharacterRaceStep/>
    },
    {
        label: "Karakterkép",
        formComponent: <CharacterRaceStep/>
    },
    {
        label: "Áttekintés",
        formComponent: <CharacterRaceStep/>
    }
];


export default function CreateCharacterForm() {
    const [actualStep, setActualStep] = useState(1);

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