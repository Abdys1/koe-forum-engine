import Image from "next/image";
import Link from "next/link";

import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import PageSection from "@/components/atoms/PageSection/PageSection";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import type { ActivityEntry, NewestCharacter, NewsItem } from "@/features/home/model/homePage";
import { metaText } from "@/styles/shared.css";

import * as styles from "./LiveChronicle.css";

type LiveChronicleProps = {
    latestActivity: ActivityEntry[],
    newestCharacter: NewestCharacter,
    news: NewsItem[]
}

export default function LiveChronicle({ latestActivity, newestCharacter, news }: LiveChronicleProps) {
    return (
        <PageSection id="chronicle" className={styles.liveSection}>
            <div className={styles.liveHeader}>
                <SectionHeading eyebrow="Élő krónika" title="Most történik" />
            </div>
            <div className={styles.liveGrid}>
                <div className={styles.activityList}>
                    {latestActivity.map(activity => (
                        <article key={activity.id} className={styles.activityCard}>
                            <Image src={activity.imageUrl} alt={activity.characterName} width={64} height={64}
                                className={styles.activityAvatar} />
                            <div className={styles.activityBody}>
                                <div className={styles.activityMeta}>
                                    <span className={styles.activityName}>{activity.characterName}</span>
                                    <span className={metaText}>{activity.timeAgo}</span>
                                </div>
                                <Link href={activity.locationHref} className={styles.activityLocation}>
                                    {activity.locationName}
                                </Link>
                                <p className={styles.activityExcerpt}>{activity.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>
                <div className={styles.liveSide}>
                    <div className={styles.newestCharacter}>
                        <Icon name="person_add" className={styles.newestCharacterIcon}/>
                        <div>
                            <span className={styles.newestCharacterLabel}>Legújabb karakter</span>
                            <Link href={newestCharacter.href} className={styles.newestCharacterName}>
                                {newestCharacter.name}
                            </Link>
                        </div>
                    </div>
                    <aside className={styles.newsPanel}>
                        <h3 className={styles.newsTitle}>
                            <Icon name="campaign" className={styles.newsIcon}/>
                            Hírek
                        </h3>
                        <ul className={styles.newsList}>
                            {news.map(item => (
                                <li key={item.id} className={styles.newsItem}>
                                    <time className={styles.newsDate}>{item.date}</time>
                                    <span className={styles.newsText}>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
            <div className={styles.joinBand}>
                <p className={styles.joinText}>A világot ti formáljátok.</p>
                <Button href="/auth/registration" title="Regisztrálok" />
            </div>
        </PageSection>
    );
}
