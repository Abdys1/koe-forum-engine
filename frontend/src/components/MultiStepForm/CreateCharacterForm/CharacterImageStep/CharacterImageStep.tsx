'use client'

import StepHeading from "@/components/StepHeading/StepHeading";
import { useState } from "react";
import Link from "next/link";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { glassBox } from "@/styles/shared.css";
import clsx from "clsx";
import * as styles from "./CharacterImageStep.css";

const IMAGE_PLACEHOLDER = "";

export default function CharacterImageStep() {
    const formContext = useMultiStepFormContext();
    const { register, getValues } = formContext.form;
    const [characterImage, setCharacterImage] = useState(getCharacterImg());

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const images = event.target.files;
        if (!images) throw new Error('No image');
        if (images.length === 0) return;
        setCharacterImage(URL.createObjectURL(images[0]));
    }

    function getCharacterImg() {
        const images = getValues("characterImg");
        if (images?.length > 0) return URL.createObjectURL(images[0]);
        return IMAGE_PLACEHOLDER;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <StepHeading title="4. Töltsd fel karakterképed:" />
                <div className={styles.uploadRow}>
                    <label htmlFor="characterImg" className={styles.imageLabel}>
                        {characterImage === IMAGE_PLACEHOLDER &&
                            <div className={styles.placeholder}>
                                <span className={styles.placeholderIcon}>+</span>
                                <span className={styles.placeholderText}>Kép feltöltése</span>
                            </div>
                        }
                        {characterImage !== IMAGE_PLACEHOLDER &&
                            <>
                                <img src={characterImage} alt="karaktered képe" className={styles.previewImg}/>
                                <span className={styles.previewOverlay}>Kép módosítása</span>
                            </>
                        }
                    </label>
                    <input type="file" id="characterImg" className={styles.hiddenInput}
                        {...register("characterImg", {onChange: handleImageChange, required: true})}
                    />
                    <div className={clsx(styles.glassPanel, glassBox)}>
                        <h3 className={styles.helpTitle}>Segédlet képfeltöltéséhez:</h3>
                        <p className={styles.helpText}>
                            A megjelenített kép mérete <span className={styles.highlight}>186px</span> x <span className={styles.highlight}>308px</span>, az optimális képarány <span className={styles.highlight}>3 : 5</span>. A sikeres feltöltéshez használj <span className={styles.highlight}>png</span>, <span className={styles.highlight}>jpg</span> vagy <span className={styles.highlight}>jpeg</span> formátumú képet.
                        </p>
                        <p className={styles.helpText}>
                            <span className={clsx(styles.highlight, styles.highlightBold)}>Fontos! </span>
                            A karakteredhez választott kép <span className={styles.highlight}>nem</span> lehet létező személyt ábrázoló kép (pl. híresség, vagy a szelfid sem). Továbbá <span className={styles.highlight}>ne válassz</span> közismert történetek szereplőiről készült illusztrációt saját karakterednek. Olyan képet válassz, ami illik az általad korábban megadott paraméterekhez (karakter faja, neme).
                        </p>
                        <Link href="#" className={styles.moreLink}>Karakterképről bővebben</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
