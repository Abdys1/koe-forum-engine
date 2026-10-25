'use client'

import Image from "next/image";
import { useId, useRef, useState } from "react";
import Button from "@/components/Button/Button";
import ActiveGames from "@/components/CharacterSheet/ActiveGames/ActiveGames";
import CharacterActivityPanel from "@/components/CharacterSheet/CharacterActivityPanel/CharacterActivityPanel";
import EditableTextSection from "@/components/CharacterSheet/EditableTextSection/EditableTextSection";
import FollowToggle from "@/components/CharacterSheet/FollowToggle/FollowToggle";
import QuoteSection from "@/components/CharacterSheet/QuoteSection/QuoteSection";
import { heading, headingTitle } from "@/components/CharacterSheet/sheetHeading.css";
import GearOverview from "@/components/GearOverview/GearOverview";
import { sexLabels } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import CharacterPortraitFrame from "@/components/MultiStepForm/CreateCharacterForm/CharacterPortraitFrame/CharacterPortraitFrame";
import { Character } from "@/dummydata/characters";
import { findRace } from "@/dummydata/races";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { CharacterActivity } from "@/lib/api/posts/types";
import { eyebrow, visuallyHidden } from "@/styles/shared.css";
import * as styles from "./CharacterSheet.css";

type CharacterSheetProps = {
    character: Character,
    activity: CharacterActivity,
    canEdit: boolean,
    canViewPrivate: boolean
}

export default function CharacterSheet({ character, activity, canEdit, canViewPrivate }: CharacterSheetProps) {
    const imageInputId = useId();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File>();
    const [appearance, setAppearance] = useState(character.appearance);
    const [backstory, setBackstory] = useState(character.backstory);
    const [secrets, setSecrets] = useState(character.secrets);
    const [notes, setNotes] = useState(character.notes);
    const [quote, setQuote] = useState(character.quote);
    const imageUrl = useObjectUrl(imageFile) ?? character.imageUrl;

    return (
        <article className={styles.sheet} aria-labelledby="character-name">
            <div className={styles.backdrop} aria-hidden="true">
                <Image src={imageUrl} alt="" fill sizes="128px" quality={50} className={styles.backdropImg}/>
            </div>

            <header className={styles.hero}>
                {canEdit
                    ? <div className={styles.portraitColumn}>
                        <CharacterPortraitFrame htmlFor={imageInputId} imageUrl={imageUrl} imageAlt={character.name} size="large"
                            overlay={{ icon: "swap_horiz", text: "Kép cseréje" }}/>
                        <Button variant="soft" size="small" icon="swap_horiz" title="Kép cseréje"
                            onClick={() => imageInputRef.current?.click()}/>
                        <input ref={imageInputRef} id={imageInputId} type="file" accept="image/png, image/jpeg"
                            className={visuallyHidden} tabIndex={-1}
                            onChange={event => event.target.files?.[0] && setImageFile(event.target.files[0])}/>
                      </div>
                    : <div className={styles.portrait}>
                        <Image src={imageUrl} alt={character.name} fill sizes="272px" className={styles.portraitImg} priority/>
                      </div>
                }

                <div className={styles.heroMain}>
                    <div className={styles.identity}>
                        <div className={styles.eyebrowRow}>
                            <span className={eyebrow}>Karakterlap</span>
                            <FollowToggle/>
                        </div>
                        <h1 id="character-name" className={styles.name}>{character.name}</h1>
                        <dl className={styles.traits}>
                            <div className={styles.trait}>
                                <dt className={visuallyHidden}>Faj</dt>
                                <dd className={styles.traitValue}>{findRace(character.raceId).title}</dd>
                            </div>
                            <div className={styles.trait}>
                                <dt className={visuallyHidden}>Nem</dt>
                                <dd className={styles.traitValue}>{sexLabels[character.sex]}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className={styles.overview}>
                        <CharacterActivityPanel activity={activity}/>

                        <section className={styles.gear} aria-labelledby="character-gear-title">
                            <div className={heading}>
                                <h2 id="character-gear-title" className={headingTitle}>Felszerelés</h2>
                            </div>
                            <GearOverview selectedIds={character.equipmentIds} emptyText="Nincs felszerelés" variant="tinted"/>
                        </section>
                    </div>
                </div>
            </header>

            <div className={styles.divider} aria-hidden="true"/>

            <div className={styles.chronicle}>
                <div className={styles.story}>
                    <EditableTextSection title="Külső megjelenés" value={appearance} onSave={setAppearance} canEdit={canEdit}
                        emptyText="Ennek a karakternek még nincs külső leírása. A játékterületen hozzászólás írásához külső jellemzés megadása szükséges."
                        editHint="A játékhoz minden karakternek szüksége van külső leírásra. Itt a lehetőség, hogy megteremtsd a karaktered kisugárzását! Fogalmazd meg néhány mondatban, mit láthat egy másik karakter, amikor elhalad mellette az utcán, vagy milyen benyomást tesz másokra első találkozáskor. Hangsúlyozd az ismertető jegyét, vagy épp azt, ha igyekszik elbújni mások árnyékában. (min. 200 karakter)"
                        minLength={200}/>

                    {canViewPrivate &&
                        <EditableTextSection title="Háttértörténet" value={backstory} onSave={setBackstory} canEdit={canEdit}
                            emptyText="A karakternek még nincs háttér történet megadva."
                            info="A karaktered előéletét csak te és a mesélők ismerik."
                            editHint="Honnan indult a karaktered, és mi vezette el idáig? Írd le azokat az eseményeket, kapcsolatokat és döntéseket, amelyek mindeddig az útjait formálták. Fontos! Extrém előnyöket biztosító képességekre, tárgyakra nem tehet szert a karaktered a múltjából adódóan. Ezeket a játék során kell beszerezned. :)"/>
                    }
                </div>

                <ActiveGames games={activity.activeGames} className={styles.aside}/>
            </div>

            {(canViewPrivate || canEdit) &&
                <div className={styles.privateRow}>
                    {canViewPrivate &&
                        <EditableTextSection title="Titkok és célok" value={secrets} onSave={setSecrets} canEdit={canEdit}
                            emptyText="A karakternek még nincsenek titkai és céljai megadva."
                            info="A karaktered titkait és céljait rajtad kívül csak a mesélők láthatják." className={styles.privateColumn}
                            editHint="Mit rejteget a karaktered a világ elől, és mire vágyik igazán? A mesélők ezekből szőhetnek számára személyes szálakat a történetbe."/>
                    }

                    {canEdit &&
                        <EditableTextSection title="Saját jegyzetek" value={notes} onSave={setNotes} canEdit={canEdit}
                            emptyText="Még nincsenek jegyzeteid ehhez a karakterhez."
                            info="A jegyzeteidet csak te látod." className={styles.privateColumn}/>
                    }
                </div>
            }

            <QuoteSection quote={quote} onSave={setQuote} canEdit={canEdit}/>
        </article>
    );
}
