import { dummyCharacter } from "@/dummydata/posts";
import { findLocation, Location } from "@/features/forum/model/location";
import { parsePageRequest, SearchParams } from "@/features/forum/model/pagination";
import { postsClient } from "@/lib/api/posts";
import { LocationPost, Page, PostCharacter } from "@/lib/api/posts/types";

export interface LocationPageData {
    location: Location,
    postsPage: Page<LocationPost>,
    author: PostCharacter
}

export async function getLocationPage(locationId: string, searchParams: SearchParams): Promise<LocationPageData | null> {
    const location = findLocation(locationId);
    if (!location) {
        return null;
    }
    const postsPage = await postsClient.getLocationPosts(location.id, parsePageRequest(searchParams));
    return { location, postsPage, author: dummyCharacter };
}
