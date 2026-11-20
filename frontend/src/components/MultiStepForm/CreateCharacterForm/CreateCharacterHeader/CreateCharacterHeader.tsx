import { Control } from "react-hook-form";
import ComponentHeading from "@/components/ComponentHeading/ComponentHeading";
import CharacterPreview from "@/components/MultiStepForm/CreateCharacterForm/CharacterPreview/CharacterPreview";
import type { CharacterInputs } from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterForm/CreateCharacterForm";
import MultiStepBar from "@/components/MultiStepForm/MultiStepBar/MultiStepBar";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import * as styles from "./CreateCharacterHeader.css";

type CreateCharacterHeaderProps = {
    control: Control<CharacterInputs>
}

export default function CreateCharacterHeader({ control }: CreateCharacterHeaderProps) {
    const { steps, actualStep } = useMultiStepFormContext();
    const isSummaryStep = actualStep === steps.length - 1;

    return (
        <header className={styles.header}>
            <div className={styles.title}><ComponentHeading title="Karakter létrehozása"/></div>
            <div className={styles.bar}><MultiStepBar/></div>
            {!isSummaryStep && <div className={styles.preview}><CharacterPreview control={control}/></div>}
        </header>
    );
}
