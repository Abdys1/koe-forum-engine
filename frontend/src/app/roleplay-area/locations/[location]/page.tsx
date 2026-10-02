import LocationPosts from "@/components/Forum/LocationPosts/LocationPosts";
import { locations } from "@/dummydata/locations";
import { postsClient } from "@/lib/api/posts";
import { parsePageRequest } from "@/lib/api/posts/pagination";
import * as styles from "./location.css";

export default async function LocationPage({
  params,
  searchParams,
}: {
  params: Promise<{ location: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { location } = await params;

  const locationData = locations[location as keyof typeof locations];

  if (!locationData) {
    return (
      <main className={styles.page}>
        <h1 className={styles.notFound}>Location not found</h1>
      </main>
    );
  }

  const postsPage = await postsClient.getLocationPosts(location, parsePageRequest(await searchParams));

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.locationName}>{locationData.name}</h1>
          <p className={styles.description}>{locationData.description}</p>
        </div>
      </header>
      <div className={styles.stream}>
        <LocationPosts
          key={`${postsPage.page}-${postsPage.pageSize}`}
          locationId={location}
          postsPage={postsPage}
        />
      </div>
    </main>
  );
}
