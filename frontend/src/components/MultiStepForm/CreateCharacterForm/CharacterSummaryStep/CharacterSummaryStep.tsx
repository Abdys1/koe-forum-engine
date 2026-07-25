'use client'

import SelectedGearElement from "@/components/SelectedGearElement/SelectedGearElement";
import StepHeading from "@/components/StepHeading/StepHeading";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { glassBox } from "@/styles/shared.css";
import clsx from "clsx";
import * as styles from "./CharacterSummaryStep.css";

export default function CharacterSummaryStep() {
    const formContext = useMultiStepFormContext();
    const { getValues } = formContext.form;

    const characterName = getValues("characterName");
    const characterRace = getValues("raceTitle");
    const characterSex = getValues("charaterSex") === "ferfi" ? "férfi" : "nő";
    const selectedPrimaryWeapon = getValues("primaryWeaponTitle");
    const selectedSecondaryWeapon = getValues("secondaryWeaponTitle");
    const selectedShield = getValues("shieldTitle");
    const selectedBodyArmor = getValues("bodyArmorTitle");
    const selectedSecondaryArmor = getValues("secondaryArmorTitle");
    const selectedHelmet = getValues("helmetTitle");
    const characterImage = URL.createObjectURL(getValues("characterImg")[0]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <StepHeading title="5. Utolsó lépés! Tekintsd át karaktered adatait:"/>
                <div className={styles.summaryRow}>
                    <div className={styles.characterImg}>
                        <img src={characterImage} alt="Az általad kiválasztott karakterkép" className={styles.characterImgEl}/>
                    </div>
                    <div className={clsx(styles.glassPanel, glassBox)}>
                        <div className={styles.charInfo}>
                            <h3 className={styles.charName}>{characterName}</h3>
                            <h4 className={styles.charMeta}>
                                <span>{characterRace}</span>, <span>{characterSex}</span>
                            </h4>
                        </div>
                        <div className={styles.gearColumns}>
                            <div className={styles.gearColumn}>
                                <SelectedGearElement optionTitle="Elsődleges fegyver" gearTitle={selectedPrimaryWeapon} isActiveClearBtn={false}/>
                                <SelectedGearElement optionTitle="Másodlagos fegyver" gearTitle={selectedSecondaryWeapon} isActiveClearBtn={false}/>
                                <SelectedGearElement optionTitle="Pajzs" gearTitle={selectedShield} isActiveClearBtn={false}/>
                            </div>
                            <div className={styles.gearColumn}>
                                <SelectedGearElement optionTitle="Testpáncél" gearTitle={selectedBodyArmor} isActiveClearBtn={false}/>
                                <SelectedGearElement optionTitle="Kéz és lábvért" gearTitle={selectedSecondaryArmor} isActiveClearBtn={false}/>
                                <SelectedGearElement optionTitle="Sisak" gearTitle={selectedHelmet} isActiveClearBtn={false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
