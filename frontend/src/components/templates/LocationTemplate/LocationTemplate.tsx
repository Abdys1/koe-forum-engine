import NotFoundMessage from "@/components/atoms/NotFoundMessage/NotFoundMessage";
import LocationHeader from "@/components/organisms/forum/LocationHeader/LocationHeader";
import LocationPosts from "@/components/organisms/forum/LocationPosts/LocationPosts";
import type { LocationPageData } from "@/features/forum/queries/getLocationPage";

import * as styles from "./LocationTemplate.css";

type LocationTemplateProps = {
    locationPage: LocationPageData | null
}

export default function LocationTemplate({ locationPage }: LocationTemplateProps) {
    if (!locationPage) {
        return (
            <main className={styles.page}>
                <NotFoundMessage message="Location not found"/>
            </main>
        );
    }

    const { location, postsPage, author } = locationPage;

    return (
        <main className={styles.page}>
            <LocationHeader location={location}/>
            <div className={styles.stream}>
                <LocationPosts
                    key={`${postsPage.page}-${postsPage.pageSize}`}
                    locationId={location.id}
                    postsPage={postsPage}
                    author={author}
                />
            </div>
        </main>
    );
}
