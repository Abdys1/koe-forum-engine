import { posts } from "@/dummydata/posts";
import { LocationPost, Page, PageRequest, PostsClient } from "@/lib/api/posts/types";

export default class DummyPostsClient implements PostsClient {
    public async getLocationPosts(locationId: string, { page, pageSize }: PageRequest): Promise<Page<LocationPost>> {
        const postCountByCharacter = posts.reduce<Record<string, number>>((counts, post) => {
            counts[post.character.id] = (counts[post.character.id] ?? 0) + 1;
            return counts;
        }, {});

        const locationPosts = posts
            .filter(post => post.locationId === locationId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        const totalItems = locationPosts.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(page, totalPages);

        const items = locationPosts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map(post => ({
                ...post,
                character: { ...post.character, postCount: postCountByCharacter[post.character.id] }
            }));

        return { items, page: currentPage, pageSize, totalItems, totalPages };
    }
}
