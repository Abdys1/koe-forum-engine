import { LocationPost, PostCharacter } from "@/lib/api/posts/types";

export interface NewPostInput {
    gameTitle: string,
    content: string
}

export interface LocalPostMeta {
    id: string,
    locationId: string,
    createdAt: string
}

export function addLocalPost(posts: LocationPost[], input: NewPostInput, author: PostCharacter, meta: LocalPostMeta): LocationPost[] {
    const postCount = (posts.find(post => post.character.id === author.id)?.character.postCount ?? 0) + 1;
    const updatedPosts = posts.map(post => post.character.id === author.id
        ? { ...post, character: { ...post.character, postCount } }
        : post);
    return [{
        ...meta,
        gameTitle: input.gameTitle.trim(),
        content: input.content,
        character: { ...author, postCount }
    }, ...updatedPosts];
}
