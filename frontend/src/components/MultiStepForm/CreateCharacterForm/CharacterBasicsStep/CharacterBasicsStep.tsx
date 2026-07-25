'use client'

import TextField from "@/components/Inputs/TextField/TextField";
import SelectableOptionBtn from "@/components/SelectableOptionBtn/SelectableOptionBtn";
import StepHeading from "@/components/StepHeading/StepHeading";
import Link from "next/link";
import { useState } from "react";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { glassBox } from "@/styles/shared.css";
import clsx from "clsx";
import * as styles from "./CharacterBasicsStep.css";

export type SelectableSex = "ferfi" | "no";

export default function CharacterBasicsStep() {
    const formContext = useMultiStepFormContext();
    const { register, getValues, setValue, formState: { errors } } = formContext.form;
    const [selectedSex, setSelectedSex] = useState<SelectableSex>(getValues("charaterSex"));

    function selectSex(sex: SelectableSex): void {
        setSelectedSex(sex);
        setValue("charaterSex", sex);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.infoPanel}>
                    <StepHeading title="2. Nevezd el karaktered és válaszd ki a nemét:" />
                    <div className={clsx(styles.glassPanel, glassBox)}>
                        <div className={styles.nameRow}>
                            <TextField label="Karakternév" {...register("characterName", {required: "A mező kitöltése kötelező!"})} errors={errors}/>
                        </div>
                        <div className={styles.rulesRow}>
                            <p className={styles.rulesText}>
                                <span className={clsx(styles.highlight, styles.highlightBold)}>Fontos! </span>
                                Karaktered neve általad alkotott <span className={styles.highlight}>fantasy név</span> legyen. <span className={styles.highlight}>Nem</span> lehet már létező valós vagy fiktív személy neve. <span className={styles.highlight}>Minimum két részből álljon</span>, és ne tartalmazzon idegen nyelvű szavakat. A magyar abc kis és nagy betűin kívül ä, ë illetve &apos; szerepelhet benne.
                            </p>
                            <Link href="#" className={styles.moreLink}>Névalkotásról bővebben</Link>
                        </div>
                        <div className={styles.sexRow}>
                            <span className={styles.sexLabel}>Karakter neme:</span>
                            <SelectableOptionBtn title="Férfi" onClick={() => selectSex("ferfi")} active={selectedSex === "ferfi"}/>
                            <SelectableOptionBtn title="Nő" onClick={() => selectSex("no")} active={selectedSex === "no"} />
                            <input type="hidden" {...register("characterSex")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
