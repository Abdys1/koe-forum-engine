import { ReactNode } from "react";

import CharacterCreationSection from "@/components/organisms/home/CharacterCreationSection/CharacterCreationSection";
import HomeHero from "@/components/organisms/home/HomeHero/HomeHero";
import LiveChronicle from "@/components/organisms/home/LiveChronicle/LiveChronicle";
import WorldSection from "@/components/organisms/home/WorldSection/WorldSection";
import type { HomePageData } from "@/features/home/model/homePage";

import * as styles from "./HomeTemplate.css";

type HomeTemplateProps = {
    data: HomePageData,
    login: ReactNode
}

export default function HomeTemplate({ data, login }: HomeTemplateProps) {
    return (
        <main className={styles.page}>
            <HomeHero slides={data.heroSlides} stats={data.activityStats} latestActivity={data.latestActivity} login={login} />
            <LiveChronicle latestActivity={data.latestActivity} newestCharacter={data.newestCharacter} news={data.news} />
            <WorldSection cities={data.cities} />
            <CharacterCreationSection steps={data.characterSteps} featuredCharacters={data.featuredCharacters} />
        </main>
    );
}
