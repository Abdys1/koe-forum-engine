import Link from "next/link";

import { heading, headingTitle } from "@/components/CharacterSheet/sheetHeading.css";
import { findLocation, locationHref } from "@/features/forum/model/location";
import { CharacterGame } from "@/lib/api/posts/types";
import { goldLink } from "@/styles/shared.css";
import { formatShortDate } from "@/utils/dateFormat";

import * as styles from "./ActiveGames.css";

type ActiveGamesProps = {
    games: CharacterGame[],
    className?: string
}

export default function ActiveGames({ games, className }: ActiveGamesProps) {
    return (
        <section className={className} aria-labelledby="character-games-title">
            <div className={heading}>
                <h2 id="character-games-title" className={headingTitle}>Futó játékai</h2>
            </div>
            {games.length > 0
                ? <ul className={styles.list}>
                    {games.map(game => {
                        const location = findLocation(game.locationId);
                        return (
                            <li key={`${game.locationId}/${game.title}`} className={styles.game}>
                                <span className={styles.title}>{game.title}</span>
                                <span className={styles.meta}>
                                    {location
                                        ? <Link href={locationHref(game.locationId)} className={goldLink}>
                                            {location.name}
                                          </Link>
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
