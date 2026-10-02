"use client"

import { useState } from "react";
import NewPostForm, { NewPostInputs } from "@/components/Forum/NewPostForm/NewPostForm";
import Pagination from "@/components/Forum/Pagination/Pagination";
import PostCard from "@/components/Forum/PostCard/PostCard";
import { dummyCharacter } from "@/dummydata/posts";
import { LocationPost, Page } from "@/lib/api/posts/types";
import * as styles from "./LocationPosts.css";

const POSTS_ANCHOR_ID = "posts";

type LocationPostsProps = {
    locationId: string,
    postsPage: Page<LocationPost>
}

export default function LocationPosts({ locationId, postsPage }: LocationPostsProps) {
    const { page, pageSize, totalPages } = postsPage;
    const [posts, setPosts] = useState<LocationPost[]>(postsPage.items);
    const [totalItems, setTotalItems] = useState(postsPage.totalItems);
    const firstPostNumber = totalItems - (page - 1) * pageSize;
    const addPost = ({ gameTitle, content }: NewPostInputs) => {
        setPosts(prev => {
            const postCount = (prev.find(post => post.character.id === dummyCharacter.id)?.character.postCount ?? 0) + 1;
            const updatedPosts = prev.map(post => post.character.id === dummyCharacter.id
                ? { ...post, character: { ...post.character, postCount } }
                : post);
            return [{
                id: crypto.randomUUID(),
                locationId,
                gameTitle: gameTitle.trim(),
                content,
                createdAt: new Date().toISOString(),
                character: { ...dummyCharacter, postCount }
            }, ...updatedPosts];
        });
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
