"use client"

import { useState } from "react";
import NewPostForm, { NewPostInputs } from "@/components/Forum/NewPostForm/NewPostForm";
import PostCard from "@/components/Forum/PostCard/PostCard";
import { dummyCharacter, Post } from "@/dummydata/posts";
import * as styles from "./LocationPosts.css";

type LocationPostsProps = {
    locationId: string,
    initialPosts: Post[]
}

export default function LocationPosts({ locationId, initialPosts }: LocationPostsProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const postCountByCharacter = posts.reduce<Record<string, number>>((counts, post) => {
        counts[post.character.id] = (counts[post.character.id] ?? 0) + 1;
        return counts;
    }, {});

    const addPost = ({ gameTitle, content }: NewPostInputs) => {
        setPosts(prev => [...prev, {
            id: crypto.randomUUID(),
            locationId,
            gameTitle: gameTitle.trim(),
            content,
            createdAt: new Date().toISOString(),
            character: dummyCharacter
        }]);
    };

    return (
        <section className={styles.container}>
            <NewPostForm onSubmit={addPost} />
            <div className={styles.list}>
                {sortedPosts.map(post => (
                    <PostCard key={post.id} post={post}
                        characterPostCount={postCountByCharacter[post.character.id]} />
                ))}
            </div>
        </section>
    );
}
