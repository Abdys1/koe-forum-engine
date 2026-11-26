'use client'

import Image from "next/image";

import Eyebrow from "@/components/atoms/Eyebrow/Eyebrow";
import EditableTextSection from "@/components/molecules/EditableTextSection/EditableTextSection";
import PanelHeading from "@/components/molecules/PanelHeading/PanelHeading";
import ActiveGames from "@/components/organisms/character/CharacterSheet/ActiveGames/ActiveGames";
import CharacterActivityPanel from "@/components/organisms/character/CharacterSheet/CharacterActivityPanel/CharacterActivityPanel";
import CharacterSheetPortrait from "@/components/organisms/character/CharacterSheet/CharacterSheetPortrait";
import FollowToggle from "@/components/organisms/character/CharacterSheet/FollowToggle/FollowToggle";
import QuoteSection from "@/components/organisms/character/CharacterSheet/QuoteSection/QuoteSection";
import GearOverview from "@/components/organisms/equipment/GearOverview/GearOverview";
import { useCharacterSheetDraft } from "@/features/character/hooks/useCharacterSheetDraft";
import { Character } from "@/features/character/model/character";
import { sexLabels } from "@/features/character/model/sex";
import { GearOverviewRoot } from "@/features/equipment/model/gearOverview";
import type { CharacterActivity } from "@/lib/api/posts/types";
import { visuallyHidden } from "@/styles/shared.css";

import * as styles from "./CharacterSheet.css";

type CharacterSheetProps = {
    character: Character,
    activity: CharacterActivity,
    gearOverview: GearOverviewRoot[],
    canEdit: boolean,
    canViewPrivate: boolean
}

export default function CharacterSheet({ character, activity, gearOverview, canEdit, canViewPrivate }: CharacterSheetProps) {
    const { imageUrl, changeImage, appearance, setAppearance, backstory, setBackstory, secrets, setSecrets, notes, setNotes, quote, setQuote }
        = useCharacterSheetDraft(character);

    return (
        <article className={styles.sheet} aria-labelledby="character-name">
            <div className={styles.backdrop} aria-hidden="true">
                <Image src={imageUrl} alt="" fill sizes="128px" quality={50} className={styles.backdropImg}/>
            </div>

            <header className={styles.hero}>
                <CharacterSheetPortrait name={character.name} imageUrl={imageUrl} canEdit={canEdit} onChangeImage={changeImage}/>

                <div className={styles.heroMain}>
                    <div className={styles.identity}>
                        <div className={styles.eyebrowRow}>
                            <Eyebrow>Karakterlap</Eyebrow>
                            <FollowToggle/>
                        </div>
                        <h1 id="character-name" className={styles.name}>{character.name}</h1>
                        <dl className={styles.traits}>
                            <div className={styles.trait}>
                                <dt className={visuallyHidden}>Faj</dt>
                                <dd className={styles.traitValue}>{character.raceName}</dd>
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
                            <PanelHeading id="character-gear-title" title="Felszerelés"/>
                            <GearOverview roots={gearOverview} emptyText="Nincs felszerelés" variant="tinted"/>
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
