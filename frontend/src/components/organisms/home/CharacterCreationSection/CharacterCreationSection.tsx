import Button from "@/components/atoms/Button/Button";
import LeadText from "@/components/atoms/LeadText/LeadText";
import PageSection from "@/components/atoms/PageSection/PageSection";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import SplitLayout from "@/components/molecules/SplitLayout/SplitLayout";
import CharacterTeasers from "@/components/organisms/character/CharacterTeasers/CharacterTeasers";
import type { FeaturedCharacter } from "@/features/home/model/homePage";

import * as styles from "./CharacterCreationSection.css";

const romanNumerals = ["I", "II", "III"];

type CharacterCreationSectionProps = {
    steps: string[],
    featuredCharacters: FeaturedCharacter[]
}

export default function CharacterCreationSection({ steps, featuredCharacters }: CharacterCreationSectionProps) {
    return (
        <PageSection id="character-creation" className={styles.characterSection}>
            <SplitLayout reverse
                text={<>
                    <SectionHeading eyebrow="Te ki vagy ebben a történetben?" title="Mielőtt belépsz a világba..." />
                    <LeadText>...döntsd el, mit hozol magaddal.</LeadText>
                    <div className={styles.journey}>
                        <p className={styles.journeyIntro}>A karakterlap csak a kezdet, néhány egyszerű lépés.</p>
                        <ol className={styles.journeySteps}>
                            {steps.map((step, index) => (
                                <li key={step} className={styles.journeyStep}>
                                    <span className={styles.journeyMarker} aria-hidden="true">{romanNumerals[index]}</span>
                                    <span className={styles.journeyText}>{step}</span>
                                </li>
                            ))}
                        </ol>
                        <p className={styles.journeyOutro}>A többit már a játékod írja tovább.</p>
                    </div>
                    <p className={styles.journeyHint}>Fajok, közösségek, fejlődés? Ismerd meg a karakteralkotás rendszerét és lehetőségeit.</p>
                    <Button href="/character/create" variant="gold" title="Karakteralkotás részletei" />
                </>}
                media={<CharacterTeasers characters={featuredCharacters} />}/>
        </PageSection>
    );
}
