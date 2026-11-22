import LocationPosts from "@/components/organisms/forum/LocationPosts/LocationPosts";
import { getLocationPage } from "@/features/forum/queries/getLocationPage";

import * as styles from "./location.css";

export default async function LocationPage({
  params,
  searchParams,
}: {
  params: Promise<{ location: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { location: locationId } = await params;
  const locationPage = await getLocationPage(locationId, await searchParams);

  if (!locationPage) {
    return (
      <main className={styles.page}>
        <h1 className={styles.notFound}>Location not found</h1>
      </main>
    );
  }

  const { location, postsPage, author } = locationPage;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.locationName}>{location.name}</h1>
          <p className={styles.description}>{location.description}</p>
        </div>
      </header>
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
