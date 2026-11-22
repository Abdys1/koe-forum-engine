import Link from "next/link";

import TextLink from "@/components/atoms/TextLink/TextLink";
import PanelHeading from "@/components/molecules/PanelHeading/PanelHeading";
import { findLocation, locationHref } from "@/features/forum/model/location";
import type { CharacterGame } from "@/lib/api/posts/types";
import { formatShortDate } from "@/utils/dateFormat";

import * as styles from "./ActiveGames.css";

type ActiveGamesProps = {
    games: CharacterGame[],
    className?: string
}

export default function ActiveGames({ games, className }: ActiveGamesProps) {
    return (
        <section className={className} aria-labelledby="character-games-title">
            <PanelHeading id="character-games-title" title="Futó játékai"/>
            {games.length > 0
                ? <ul className={styles.list}>
                    {games.map(game => {
                        const location = findLocation(game.locationId);
                        return (
                            <li key={`${game.locationId}/${game.title}`} className={styles.game}>
                                <span className={styles.title}>{game.title}</span>
                                <span className={styles.meta}>
                                    {location
                                        ? <TextLink href={locationHref(game.locationId)}>
                                            {location.name}
                                          </TextLink>
                                        : game.locationId
                                    }
                                </span>
                                <span className={styles.meta}>
                                    {game.postCount} hozzászólás · utoljára{" "}
                                    <time dateTime={game.lastPostAt}>{formatShortDate(game.lastPostAt)}</time>
                                </span>
                            </li>
                        );
                    })}
                  </ul>
                : <p className={styles.empty}>Jelenleg nincs futó játéka.</p>
            }
        </section>
    );
}
