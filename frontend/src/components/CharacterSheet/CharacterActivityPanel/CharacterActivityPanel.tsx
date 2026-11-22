'use client'

import Link from "next/link";

import Button from "@/components/atoms/Button/Button";
import TextLink from "@/components/atoms/TextLink/TextLink";
import { findLocation, locationHref } from "@/features/forum/model/location";
import { CharacterActivity } from "@/lib/api/posts/types";
import { formatLongDate } from "@/utils/dateFormat";

import * as styles from "./CharacterActivityPanel.css";

type CharacterActivityPanelProps = {
    activity: CharacterActivity
}

const numberFormatter = new Intl.NumberFormat("hu-HU");

export default function CharacterActivityPanel({ activity }: CharacterActivityPanelProps) {
    const lastPost = activity.lastPost;
    const lastLocation = lastPost && findLocation(lastPost.locationId);

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
                                <TextLink href={locationHref(lastPost.locationId)}>
                                    {lastLocation.name}
                                </TextLink>
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
