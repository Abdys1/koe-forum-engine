import TextLink from "@/components/atoms/TextLink/TextLink";
import type { ActivityEntry, ActivityStat } from "@/features/home/model/homePage";
import { metaText } from "@/styles/shared.css";

import * as styles from "./ActivityBar.css";

type ActivityBarProps = {
    stats: ActivityStat[],
    latestActivity: ActivityEntry[]
}

export default function ActivityBar({ stats, latestActivity }: ActivityBarProps) {
    return (
        <div className={styles.activityBar}>
            <div className={styles.activityHeader}>
                <h2 className={styles.liveBadge}>
                    <span className={styles.liveDot} />
                    A világ most is mozgásban
                </h2>
                <dl className={styles.stats}>
                    {stats.map(stat => (
                        <div key={stat.label} className={styles.stat}>
                            <dt className={styles.statLabel}>{stat.label}</dt>
                            <dd className={styles.statValue}>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <ul className={styles.recentPosts}>
                {latestActivity.map(activity => (
                    <li key={activity.id} className={styles.recentPost}>
                        <div className={styles.recentBody}>
                            <p className={styles.recentMeta}>
                                <span className={styles.recentName}>{activity.characterName}</span> írt ide:{" "}
                                <TextLink href={activity.locationHref} variant="accent">
                                    {activity.locationName}
                                </TextLink>
                            </p>
                        </div>
                        <span className={metaText}>{activity.timeAgo}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
