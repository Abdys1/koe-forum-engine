import { posts } from "@/dummydata/posts";
import { CharacterActivity, CharacterGame, LocationPost, Page, PageRequest, PostsClient } from "@/lib/api/posts/types";

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

    public async getCharacterActivity(characterId: string): Promise<CharacterActivity> {
        const characterPosts = posts.filter(post => post.character.id === characterId);
        const lastPost = characterPosts.reduce<typeof characterPosts[number] | undefined>((latest, post) =>
            !latest || new Date(post.createdAt) > new Date(latest.createdAt) ? post : latest, undefined);

        const games = characterPosts.reduce<Map<string, CharacterGame>>((byGame, post) => {
            const key = `${post.locationId}/${post.gameTitle}`;
            const game = byGame.get(key);
            if (!game) {
                byGame.set(key, { title: post.gameTitle, locationId: post.locationId, postCount: 1, lastPostAt: post.createdAt });
            } else {
                game.postCount++;
                if (new Date(post.createdAt) > new Date(game.lastPostAt)) game.lastPostAt = post.createdAt;
            }
            return byGame;
        }, new Map());

        return {
            postCount: characterPosts.length,
            lastPost: lastPost && { locationId: lastPost.locationId, createdAt: lastPost.createdAt },
            activeGames: Array.from(games.values())
                .sort((a, b) => new Date(b.lastPostAt).getTime() - new Date(a.lastPostAt).getTime())
        };
    }
}
