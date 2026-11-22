"use client"

import { useState } from "react";

import NewPostForm from "@/components/Forum/NewPostForm/NewPostForm";
import Pagination from "@/components/Forum/Pagination/Pagination";
import PostCard from "@/components/Forum/PostCard/PostCard";
import { addLocalPost, NewPostInput } from "@/features/forum/model/post";
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
    const [posts, setPosts] = useState<LocationPost[]>(postsPage.items);
    const [totalItems, setTotalItems] = useState(postsPage.totalItems);
    const firstPostNumber = totalItems - (page - 1) * pageSize;
    const addPost = (input: NewPostInput) => {
        setPosts(prev => addLocalPost(prev, input, author, {
            id: crypto.randomUUID(),
            locationId,
            createdAt: new Date().toISOString()
        }));
        setTotalItems(prev => prev + 1);
    };

    const pagination = (
        <Pagination page={page} pageSize={pageSize} totalPages={totalPages} anchorId={POSTS_ANCHOR_ID} />
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
