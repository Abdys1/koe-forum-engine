import { Control } from "react-hook-form";

import PageHeading from "@/components/atoms/PageHeading/PageHeading";
import CharacterPreview from "@/components/organisms/character/CreateCharacterForm/CharacterPreview/CharacterPreview";
import MultiStepBar from "@/components/organisms/form/MultiStepForm/MultiStepBar";
import { useMultiStepFormContext } from "@/components/organisms/form/MultiStepForm/MultiStepFormContext";
import type { CharacterInputs } from "@/features/character/model/createCharacter";

import * as styles from "./CreateCharacterHeader.css";

type CreateCharacterHeaderProps = {
    control: Control<CharacterInputs>
}

export default function CreateCharacterHeader({ control }: CreateCharacterHeaderProps) {
    const { steps, actualStep } = useMultiStepFormContext<CharacterInputs>();
    const isSummaryStep = actualStep === steps.length - 1;

    return (
        <header className={styles.header}>
            <div className={styles.title}><PageHeading title="Karakter létrehozása"/></div>
            <div className={styles.bar}><MultiStepBar/></div>
            {!isSummaryStep && <div className={styles.preview}><CharacterPreview control={control}/></div>}
        </header>
    );
}
