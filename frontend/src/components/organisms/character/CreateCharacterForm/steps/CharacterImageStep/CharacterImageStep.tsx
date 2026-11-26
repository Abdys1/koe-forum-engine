'use client'

import clsx from "clsx";
import { useId, useRef } from "react";
import { useWatch } from "react-hook-form";

import Button from "@/components/atoms/Button/Button";
import PortraitFrame from "@/components/atoms/PortraitFrame/PortraitFrame";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import { stepContent, stepIntro } from "@/components/organisms/character/CreateCharacterForm/steps/characterStep.css";
import { useMultiStepFormContext } from "@/components/organisms/form/MultiStepForm/MultiStepFormContext";
import { characterImageRule } from "@/features/character/model/characterValidation";
import type { CharacterInputs } from "@/features/character/model/createCharacter";
import { useObjectUrl } from "@/hooks/useObjectUrl";

import * as styles from "./CharacterImageStep.css";

export default function CharacterImageStep() {
    const formContext = useMultiStepFormContext<CharacterInputs>();
    const { register, control, formState: { errors } } = formContext.form;
    const imageErrorId = useId();
    const imageError = errors.characterImg?.message as string | undefined;
    const images: FileList | undefined = useWatch({ control, name: "characterImg" });
    const characterImage = useObjectUrl(images?.[0]);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const { ref: registerImageRef, ...imageField } = register("characterImg", { validate: characterImageRule });

    return (
        <div className={stepContent}>
            <SectionHeading title="Az arc, amiről a történetek szólnak"/>
            <p className={stepIntro}>
                Misztikumokkal övezett szóbeszédek alakja, regék hőse vagy dalnokok múzsája? Rajtad áll, ki rejlik mögötte.
            </p>
            <div className={styles.uploadRow}>
                <div className={styles.portraitColumn}>
                    <PortraitFrame htmlFor="characterImg" imageUrl={characterImage} imageAlt="karaktered képe"
                        placeholder={{ icon: "add_photo_alternate", text: "Kép feltöltése" }}
                        overlay={{ icon: "swap_horiz", text: "Kép cseréje" }}/>
                    {characterImage &&
                        <Button variant="soft" size="small" icon="swap_horiz" title="Kép cseréje"
                            onClick={() => imageInputRef.current?.click()}/>
                    }
                    {imageError && <span id={imageErrorId} role="alert" className={styles.imageError}>{imageError}</span>}
                </div>
                <input type="file" id="characterImg" accept="image/png, image/jpeg" className={styles.hiddenInput}
                    aria-invalid={!!imageError} aria-describedby={imageError ? imageErrorId : undefined}
                    {...imageField}
                    ref={element => {
                        registerImageRef(element);
                        imageInputRef.current = element;
                    }}
                />
                <div className={styles.panel}>
                    <h3 className={styles.helpTitle}>Segédlet képfeltöltéséhez</h3>
                    <div className={styles.rulesBlock}>
                        <h4 className={styles.rulesTitle}>Szabályok</h4>
                        <ul className={styles.helpList}>
                            <li className={styles.ruleItem}>
                                <span className={styles.highlight}>Nem</span> ábrázolhat létező személyt (pl. hírességet vagy saját fotót)
                            </li>
                            <li className={styles.ruleItem}>
                                <span className={styles.highlight}>Ne válassz</span> közismert történetek szereplőiről készült illusztrációt
                            </li>
                            <li className={styles.ruleItem}>
                                Illeszkedjen a korábban megadott <span className={styles.highlight}>fajhoz</span>
                            </li>
                        </ul>
                    </div>
                    <ul className={clsx(styles.helpList, styles.helpBlock)}>
                        <li className={styles.helpItem}>
                            Képarány: <span className={styles.highlight}>5 : 8</span> (álló kép)
                        </li>
                        <li className={styles.helpItem}>
                            Ajánlott méret: <span className={styles.highlight}>270 × 433 px</span>
                        </li>
                        <li className={styles.helpItem}>
                            Formátum: <span className={styles.highlight}>png</span>, <span className={styles.highlight}>jpg</span> vagy <span className={styles.highlight}>jpeg</span>
                        </li>
                    </ul>
                    <Button href="#" variant="outline" size="medium" title="Karakterképről bővebben"/>
                </div>
            </div>
        </div>
    );
}
