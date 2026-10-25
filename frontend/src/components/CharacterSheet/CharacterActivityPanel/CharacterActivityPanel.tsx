'use client'

import Link from "next/link";
import Button from "@/components/Button/Button";
import { locations } from "@/dummydata/locations";
import { CharacterActivity } from "@/lib/api/posts/types";
import { formatLongDate } from "@/lib/dateFormat";
import { goldLink } from "@/styles/shared.css";
import * as styles from "./CharacterActivityPanel.css";

type CharacterActivityPanelProps = {
    activity: CharacterActivity
}

const numberFormatter = new Intl.NumberFormat("hu-HU");

export default function CharacterActivityPanel({ activity }: CharacterActivityPanelProps) {
    const lastPost = activity.lastPost;
    const lastLocation = lastPost && locations[lastPost.locationId as keyof typeof locations];

    return (
        <section className={styles.panel} aria-label="Aktivitás">
            <Button href="#" variant="primary" size="small" icon="mail" title="Privát üzenet"/>
            <dl className={styles.stats}>
                <div className={styles.inlineStat}>
                    <dt className={styles.statLabel}>Összes hozzászólás:</dt>
                    <dd className={styles.statValue}>{numberFormatter.format(activity.postCount)}</dd>
                </div>
                <div className={styles.stat}>
                    <dt className={styles.statLabel}>Legutóbb itt látták</dt>
                    {lastPost && lastLocation
                        ? <>
                            <dd className={styles.statValue}>
                                <Link href={`/roleplay-area/locations/${lastPost.locationId}`} className={goldLink}>
                                    {lastLocation.name}
                                </Link>
                            </dd>
                            <dd>
                                <time dateTime={lastPost.createdAt} className={styles.statMeta}>
                                    {formatLongDate(lastPost.createdAt)}
                                </time>
                            </dd>
                          </>
                        : <dd className={styles.statEmpty}>Még nem bukkant fel sehol</dd>
                    }
                </div>
            </dl>
            <Button href="#" variant="ghost" size="small" title="Hozzászólások megtekintése"/>
        </section>
    );
}
