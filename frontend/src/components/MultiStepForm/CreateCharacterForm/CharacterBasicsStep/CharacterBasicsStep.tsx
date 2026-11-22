'use client'

import clsx from "clsx";
import { useId, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { SelectableSex, sexOptions } from "@/features/character/model/sex";

import * as styles from "./CharacterBasicsStep.css";

export default function CharacterBasicsStep() {
    const formContext = useMultiStepFormContext();
    const { register, getValues, setValue, trigger, formState: { errors } } = formContext.form;
    const nameInputId = useId();
    const nameErrorId = useId();
    const nameError = errors.characterName?.message as string | undefined;
    const [selectedSex, setSelectedSex] = useState<SelectableSex>(getValues("characterSex"));

    function selectSex(sex: SelectableSex): void {
        setSelectedSex(sex);
        setValue("characterSex", sex);
    }

    return (
        <div className={styles.content}>
            <div className={styles.infoPanel}>
                <SectionHeading title="Identitás"/>
                <div className={styles.panel}>
                    <div className={styles.nameField}>
                        <label htmlFor={nameInputId} className={styles.nameLabel}>Hogyan szólíthatlak, utazó?</label>
                        <div className={styles.nameFrame}>
                            <input id={nameInputId} type="text" placeholder="Névtelen vándor" autoComplete="off"
                                aria-invalid={!!nameError} aria-describedby={nameError ? nameErrorId : undefined}
                                className={clsx(styles.nameInput, nameError && styles.nameInputError)}
                                {...register("characterName", {
                                    required: "A mező kitöltése kötelező!",
                                    onChange: () => nameError && trigger("characterName")
                                })}/>
                        </div>
                        {nameError && <span id={nameErrorId} role="alert" className={styles.nameError}>{nameError}</span>}
                    </div>
                    <div className={styles.rulesRow}>
                        <p className={styles.rulesText}>
                            <span className={clsx(styles.highlight, styles.highlightBold)}>Fontos! </span>
                            Karaktered neve általad alkotott <span className={styles.highlight}>fantasy név</span> legyen. Tippeket, bővebb útmutatót és szabályokat eléred a segédletre kattintva.
                        </p>
                        <Button href="#" variant="outline" size="medium" title="Névadási segédlet"/>
                    </div>
                    <div className={styles.sexRow}>
                        <span id="character-sex-label" className={styles.sexLabel}>Karakter neme</span>
                        <div role="radiogroup" aria-labelledby="character-sex-label" className={styles.sexOptions}>
                            {sexOptions.map(option => (
                                <button key={option.value} type="button" role="radio"
                                    aria-checked={selectedSex === option.value}
                                    className={clsx(styles.sexBtn, selectedSex === option.value && styles.sexBtnActive)}
                                    onClick={() => selectSex(option.value)}>
                                    <Icon name={option.icon} className={styles.sexIcon}/>
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <input type="hidden" {...register("characterSex")}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
