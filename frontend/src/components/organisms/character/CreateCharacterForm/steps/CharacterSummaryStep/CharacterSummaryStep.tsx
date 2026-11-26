'use client'

import clsx from "clsx";

import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/atoms/IconButton/IconButton";
import PortraitFrame from "@/components/atoms/PortraitFrame/PortraitFrame";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import SocialIcon from "@/components/atoms/SocialIcon/SocialIcon";
import { stepContent, stepIntro } from "@/components/organisms/character/CreateCharacterForm/steps/characterStep.css";
import GearOverview from "@/components/organisms/equipment/GearOverview/GearOverview";
import { useMultiStepFormContext } from "@/components/organisms/form/MultiStepForm/MultiStepFormContext";
import type { CharacterInputs } from "@/features/character/model/createCharacter";
import { SelectableSex, sexLabels } from "@/features/character/model/sex";
import { findSocialLink } from "@/features/community/model/socialLinks";
import { GearOverviewRoot } from "@/features/equipment/model/gearOverview";
import { useObjectUrl } from "@/hooks/useObjectUrl";

import * as styles from "./CharacterSummaryStep.css";

type CharacterSummaryStepProps = {
    gearOverview: GearOverviewRoot[]
}

const discord = findSocialLink("discord");

export default function CharacterSummaryStep({ gearOverview }: CharacterSummaryStepProps) {
    const { form, steps, goToStep } = useMultiStepFormContext<CharacterInputs>();
    const { getValues, formState: { errors, isSubmitting, isSubmitSuccessful } } = form;
    const submitErrors = {
        characterName: errors.characterName?.message,
        characterImg: errors.characterImg?.message,
        equipmentIds: errors.equipmentIds?.message
    };
    const errorMessages = Object.values(submitErrors).filter((message): message is string => !!message);
    const submitPending = isSubmitting || isSubmitSuccessful;

    const characterName: string = getValues("characterName");
    const raceTitle: string = getValues("raceTitle");
    const characterSex: SelectableSex = getValues("characterSex");
    const characterImage = useObjectUrl(getValues("characterImg")?.[0]);

    const openStep = (label: string) => () => goToStep(steps.indexOf(label));

    return (
        <div className={stepContent}>
            <SectionHeading title="Vár az út"/>
            <p className={stepIntro}>
                Ellenőrizd az adatokat, mielőtt életre kelted a karaktered.
            </p>

            <div className={styles.sheetRow}>
                <PortraitFrame imageUrl={characterImage} onClick={openStep("Karakterkép")} label="Karakterkép cseréje"
                    invalid={!!submitErrors.characterImg}
                    overlay={{ icon: "swap_horiz", text: "Kép cseréje" }}/>

                <article className={styles.sheet} aria-label="Karakterlap">
                    <header className={styles.identity}>
                        <div className={styles.nameRow}>
                            <h3 className={styles.name}>{characterName}</h3>
                            <IconButton icon="edit" label="Név módosítása" onClick={openStep("Identitás")} invalid={!!submitErrors.characterName}/>
                        </div>
                        <div className={styles.seals}>
                            <button type="button" className={styles.seal} onClick={openStep("Faj")} aria-label={`Faj: ${raceTitle}. Módosítás`}>
                                <span className={styles.sealLabel}>Faj</span>
                                {raceTitle}
                                <Icon name="edit" className={styles.sealIcon}/>
                            </button>
                            <button type="button" className={styles.seal} onClick={openStep("Identitás")} aria-label={`Nem: ${sexLabels[characterSex]}. Módosítás`}>
                                <span className={styles.sealLabel}>Nem</span>
                                {sexLabels[characterSex]}
                                <Icon name="edit" className={styles.sealIcon}/>
                            </button>
                        </div>
                    </header>

                    <section className={styles.gear} aria-labelledby="summary-gear-title">
                        <div className={styles.sectionHeader}>
                            <h4 id="summary-gear-title" className={styles.sectionTitle}>Felszerelés</h4>
                            <IconButton icon="edit" label="Felszerelés módosítása" onClick={openStep("Felszerelés")}
                                invalid={!!submitErrors.equipmentIds}/>
                        </div>
                        <GearOverview roots={gearOverview}/>
                    </section>
                </article>

                <aside className={styles.infoPanel} aria-label="Információk">
                    {errorMessages.length > 0
                        ? <div className={styles.infoStatus} role="alert">
                            <div className={styles.infoHeader}>
                                <Icon name="priority_high" className={clsx(styles.infoIcon, styles.infoIconError)}/>
                                <p className={styles.infoTitle}>Hiba történt a feldolgozás során</p>
                            </div>
                            <p className={styles.infoText}>A pirossal jelölt részeket javítsd, mielőtt újra próbálkozol.</p>
                            <ul className={styles.errorList}>
                                {errorMessages.map(message => <li key={message} className={styles.errorItem}>{message}</li>)}
                            </ul>
                        </div>
                        : <div className={styles.infoStatus} role="note">
                            <div className={styles.infoHeader}>
                                <Icon name="check" className={styles.infoIcon}/>
                                <p className={styles.infoTitle}>Elkészültél a karaktered elsődleges adataival</p>
                            </div>
                            <p className={styles.infoText}>
                                Külső leírás és háttértörténet megadására a létrehozás után lesz lehetőséged.
                            </p>
                        </div>
                    }
                    <Button variant="gold" size="large" type="submit" disabled={submitPending || errorMessages.length > 0}
                        title={submitPending ? "Létrehozás folyamatban…" : "Karakter létrehozása"} className={styles.createBtn}/>
                    <div className={styles.helpSection}>
                        <h4 className={styles.helpTitle}>Jól jönne némi segítség?</h4>
                        <p className={styles.infoText}>Nézd meg a karakteralkotási segédletet.</p>
                        <Button href="#" variant="outline" size="medium" title="Segédlet" className={styles.helpBtn}/>
                        <p className={styles.infoText}>Ha nem találod a választ, chaten vagy discordon elérhetsz minket.</p>
                    </div>
                    <div className={styles.contactLinks}>
                        <a href="#" className={styles.contactLink} aria-label="Chat" title="Chat">
                            <Icon name="chat" className={styles.contactIcon}/>
                        </a>
                        <a href={discord.href ?? "#"} className={styles.contactLink} aria-label={discord.label} title={discord.label}>
                            <SocialIcon network="discord" className={styles.contactSocialIcon}/>
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    );
}
