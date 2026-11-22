import { ReactNode } from "react";

import Button from "@/components/atoms/Button/Button";
import Eyebrow from "@/components/atoms/Eyebrow/Eyebrow";
import BackgroundSlideshow from "@/components/molecules/BackgroundSlideshow/BackgroundSlideshow";
import ActivityBar from "@/components/organisms/home/ActivityBar/ActivityBar";
import type { ActivityEntry, ActivityStat, HeroSlide } from "@/features/home/model/homePage";

import * as styles from "./HomeHero.css";

type HomeHeroProps = {
    slides: HeroSlide[],
    stats: ActivityStat[],
    latestActivity: ActivityEntry[],
    login: ReactNode
}

export default function HomeHero({ slides, stats, latestActivity, login }: HomeHeroProps) {
    return (
        <section className={styles.hero}>
            <BackgroundSlideshow slides={slides} />
            <div className={styles.heroInner}>
                <div className={styles.heroText}>
                    <Eyebrow>Fórumos szerepjáték</Eyebrow>
                    <h1 className={styles.heroTitle}>Gloamfall</h1>
                    <p className={styles.heroLead}>
                        Amikor a nap lebukik a romok mögött, a világ megmutatja valódi arcát. Lépj be a
                        birodalomba, ahol minden történetet a játékosok írnak, és minden döntés nyomot hagy.
                    </p>
                    <div className={styles.heroActions}>
                        <Button href="/auth/registration" title="Regisztráció" />
                        <Button href="#world" variant="ghost" title="Fedezd fel a világot" />
                    </div>
                </div>
                <div className={styles.heroLogin}>{login}</div>
            </div>
            <ActivityBar stats={stats} latestActivity={latestActivity} />
        </section>
    );
}
