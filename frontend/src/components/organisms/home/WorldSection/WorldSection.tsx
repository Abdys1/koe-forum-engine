import Button from "@/components/atoms/Button/Button";
import LeadText from "@/components/atoms/LeadText/LeadText";
import PageSection from "@/components/atoms/PageSection/PageSection";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import Showcase from "@/components/molecules/Showcase/Showcase";
import SplitLayout from "@/components/molecules/SplitLayout/SplitLayout";
import type { PlayableCity } from "@/features/home/model/homePage";

import * as styles from "./WorldSection.css";

type WorldSectionProps = {
    cities: PlayableCity[]
}

export default function WorldSection({ cities }: WorldSectionProps) {
    return (
        <PageSection id="world">
            <SplitLayout className={styles.worldSplit}
                text={<>
                    <SectionHeading eyebrow="A világ" title="A tornyok fénye elhalványult" />
                    <LeadText>
                        Már semmi nem ugyanaz. A mágia kiszámíthatatlanabb, az erdők szeszélyesebbek. Az utak... nos, az utazás mindig is járt némi kockázattal, de ez eddig sem bírt rá mindenkit az otthon maradásra.
                    </LeadText>
                    <Button href="/world" variant="gold" title="Kódexek a világról" />
                </>}
                media={<Showcase showcaseElements={cities} label="Játszható városok" />}/>
        </PageSection>
    );
}
