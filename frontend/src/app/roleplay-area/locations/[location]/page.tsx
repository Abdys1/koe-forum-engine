import LocationPosts from "@/components/Forum/LocationPosts/LocationPosts";
import { locations } from "@/dummydata/locations";
import { posts } from "@/dummydata/posts";
import * as styles from "./location.css";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
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

  const locationPosts = posts.filter(post => post.locationId === location);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.locationName}>{locationData.name}</h1>
          <p className={styles.description}>{locationData.description}</p>
        </div>
      </header>
      <div className={styles.stream}>
        <LocationPosts locationId={location} initialPosts={locationPosts} />
      </div>
    </main>
  );
}
