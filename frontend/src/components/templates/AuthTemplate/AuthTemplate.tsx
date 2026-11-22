import { ReactNode } from "react";

import BackgroundSlideshow from "@/components/molecules/BackgroundSlideshow/BackgroundSlideshow";
import type { HeroSlide } from "@/features/home/model/homePage";

import * as styles from "./AuthTemplate.css";

type AuthTemplateProps = {
    slides: HeroSlide[],
    title: string,
    lead: string,
    children: ReactNode
}

export default function AuthTemplate({ slides, title, lead, children }: AuthTemplateProps) {
    return (
        <main className={styles.page}>
            <BackgroundSlideshow slides={slides} />
            <div className={styles.centerVeil} />
            <div className={styles.content}>
                <span className={styles.siteName}>Gloamfall</span>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.lead}>{lead}</p>
                <div className={styles.card}>{children}</div>
            </div>
        </main>
    );
}
