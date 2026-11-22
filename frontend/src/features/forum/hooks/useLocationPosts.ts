import { useState } from "react";

import { getFirstPostNumber } from "@/features/forum/model/pagination";
import { addLocalPost, NewPostInput } from "@/features/forum/model/post";
import { LocationPost, Page, PostCharacter } from "@/lib/api/posts/types";

export interface LocationPostsState {
    posts: LocationPost[],
    firstPostNumber: number,
    addPost: (input: NewPostInput) => void
}

export function useLocationPosts(locationId: string, postsPage: Page<LocationPost>, author: PostCharacter): LocationPostsState {
    const [posts, setPosts] = useState<LocationPost[]>(postsPage.items);
    const [totalItems, setTotalItems] = useState(postsPage.totalItems);

    const addPost = (input: NewPostInput) => {
        setPosts(prev => addLocalPost(prev, input, author, {
            id: crypto.randomUUID(),
            locationId,
            createdAt: new Date().toISOString()
        }));
        setTotalItems(prev => prev + 1);
    };

    return {
        posts,
        firstPostNumber: getFirstPostNumber(totalItems, postsPage.page, postsPage.pageSize),
        addPost
    };
}
