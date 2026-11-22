'use client'


import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/atoms/IconButton/IconButton";
import PortraitFrame from "@/components/atoms/PortraitFrame/PortraitFrame";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import SocialIcon from "@/components/atoms/SocialIcon/SocialIcon";
import GearOverview from "@/components/GearOverview/GearOverview";
import { stepContent, stepIntro } from "@/components/organisms/character/CreateCharacterForm/steps/characterStep.css";
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
    const { getValues } = form;

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
                    overlay={{ icon: "swap_horiz", text: "Kép cseréje" }}/>

                <article className={styles.sheet} aria-label="Karakterlap">
                    <header className={styles.identity}>
                        <div className={styles.nameRow}>
                            <h3 className={styles.name}>{characterName}</h3>
                            <IconButton icon="edit" label="Név módosítása" onClick={openStep("Identitás")}/>
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
                            <IconButton icon="edit" label="Felszerelés módosítása" onClick={openStep("Felszerelés")}/>
                        </div>
                        <GearOverview roots={gearOverview}/>
                    </section>
                </article>

                <aside className={styles.infoPanel} aria-label="Információk">
                    <div className={styles.infoStatus} role="note">
                        <div className={styles.infoHeader}>
                            <Icon name="check" className={styles.infoIcon}/>
                            <p className={styles.infoTitle}>Elkészültél a karaktered elsődleges adataival</p>
                        </div>
                        <p className={styles.infoText}>
                            Külső leírás és háttértörténet megadására a létrehozás után lesz lehetőséged.
                        </p>
                    </div>
                    <Button variant="gold" size="large" type="submit" title="Karakter létrehozása" className={styles.createBtn}/>
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
