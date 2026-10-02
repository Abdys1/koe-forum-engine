import { Post, PostCharacter } from "@/dummydata/posts";

export const POST_PAGE_SIZES = [20, 50, 100] as const;
export const DEFAULT_POST_PAGE_SIZE: PostPageSize = 20;

export type PostPageSize = (typeof POST_PAGE_SIZES)[number];

export type PageRequest = {
    page: number,
    pageSize: PostPageSize
};

export type Page<ItemType> = {
    items: ItemType[],
    page: number,
    pageSize: PostPageSize,
    totalItems: number,
    totalPages: number
};

export interface PostAuthor extends PostCharacter {
    postCount: number
}

export interface LocationPost extends Omit<Post, "character"> {
    character: PostAuthor
}

export interface PostsClient {
    getLocationPosts: (locationId: string, pageRequest: PageRequest) => Promise<Page<LocationPost>>
};
