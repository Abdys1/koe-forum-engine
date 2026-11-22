import type { Location } from "@/features/forum/model/location";

import * as styles from "./LocationHeader.css";

type LocationHeaderProps = {
    location: Location
}

export default function LocationHeader({ location }: LocationHeaderProps) {
    return (
        <header className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.locationName}>{location.name}</h1>
                <p className={styles.description}>{location.description}</p>
            </div>
        </header>
    );
}
