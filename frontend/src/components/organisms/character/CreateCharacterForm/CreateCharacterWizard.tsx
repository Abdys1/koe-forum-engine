"use client"

import { SubmitHandler } from "react-hook-form";

import CreateCharacterHeader from "@/components/organisms/character/CreateCharacterForm/CreateCharacterHeader/CreateCharacterHeader";
import CharacterBasicsStep from "@/components/organisms/character/CreateCharacterForm/steps/CharacterBasicsStep/CharacterBasicsStep";
import CharacterGearStep from "@/components/organisms/character/CreateCharacterForm/steps/CharacterGearStep/CharacterGearStep";
import CharacterImageStep from "@/components/organisms/character/CreateCharacterForm/steps/CharacterImageStep/CharacterImageStep";
import CharacterRaceStep from "@/components/organisms/character/CreateCharacterForm/steps/CharacterRaceStep/CharacterRaceStep";
import CharacterSummaryStep from "@/components/organisms/character/CreateCharacterForm/steps/CharacterSummaryStep/CharacterSummaryStep";
import MultiStepForm from "@/components/organisms/form/MultiStepForm/MultiStepForm";
import type { CharacterCreation } from "@/features/character/hooks/useCharacterCreation";
import type { CharacterInputs } from "@/features/character/model/createCharacter";

import * as styles from "./CreateCharacterWizard.css";

type CreateCharacterWizardProps = {
    creation: CharacterCreation,
    onSubmit: SubmitHandler<CharacterInputs>
}

export default function CreateCharacterWizard({ creation, onSubmit }: CreateCharacterWizardProps) {
    const { form, equipmentCatalog, gearOverview, races, selectedRace, isNameComplete, isImageComplete, validateName, validateImage } = creation;
    const raceStepStyle = { '--raceUrl': `url('${selectedRace?.imageUrl}')` } as React.CSSProperties;

    return (
        <MultiStepForm form={form} header={<CreateCharacterHeader control={form.control}/>} onSubmit={onSubmit}>
            <MultiStepForm.Step label="Faj" style={raceStepStyle} className={styles.raceStepBg}>
                <CharacterRaceStep races={races} selectedRace={selectedRace}/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Identitás"
                                validate={validateName}
                                complete={isNameComplete}
                                style={raceStepStyle}
                                className={styles.raceStepBg}>
                <CharacterBasicsStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Felszerelés" className={styles.gearStepBg}>
               <CharacterGearStep equipmentCatalog={equipmentCatalog}/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Karakterkép" validate={validateImage} complete={isImageComplete}>
                <CharacterImageStep/>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Áttekintés">
                <CharacterSummaryStep gearOverview={gearOverview}/>
            </MultiStepForm.Step>
        </MultiStepForm>
    );
}
