"use client"

import Pagination from "@/components/molecules/Pagination/Pagination";
import PostCard from "@/components/molecules/PostCard/PostCard";
import NewPostForm from "@/components/organisms/forum/NewPostForm/NewPostForm";
import { useLocationPosts } from "@/features/forum/hooks/useLocationPosts";
import { DEFAULT_POST_PAGE_SIZE, POST_PAGE_SIZES } from "@/features/forum/model/pagination";
import type { LocationPost, Page, PostCharacter } from "@/lib/api/posts/types";

import * as styles from "./LocationPosts.css";

const POSTS_ANCHOR_ID = "posts";

type LocationPostsProps = {
    locationId: string,
    postsPage: Page<LocationPost>,
    author: PostCharacter
}

export default function LocationPosts({ locationId, postsPage, author }: LocationPostsProps) {
    const { page, pageSize, totalPages } = postsPage;
    const { posts, firstPostNumber, addPost } = useLocationPosts(locationId, postsPage, author);

    const pagination = (
        <Pagination page={page} totalPages={totalPages} pageSize={pageSize} pageSizeOptions={POST_PAGE_SIZES}
            defaultPageSize={DEFAULT_POST_PAGE_SIZE} pageSizeLabel="Hozzászólás / oldal" anchorId={POSTS_ANCHOR_ID} />
    );

    return (
        <section className={styles.container}>
            <NewPostForm onSubmit={addPost} />
            <div id={POSTS_ANCHOR_ID} className={styles.posts}>
                {pagination}
                <div className={styles.list}>
                    {posts.map((post, index) => (
                        <PostCard key={post.id} post={post} postNumber={firstPostNumber - index} />
                    ))}
                </div>
                {pagination}
            </div>
        </section>
    );
}
