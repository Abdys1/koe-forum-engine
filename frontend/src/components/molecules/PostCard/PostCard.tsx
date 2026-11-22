import Image from "next/image";

import Icon from "@/components/atoms/Icon/Icon";
import { formatDateTime } from "@/utils/dateFormat";

import * as styles from "./PostCard.css";

export interface PostCardPost {
    gameTitle: string,
    content: string,
    createdAt: string,
    character: {
        name: string,
        imageUrl: string,
        postCount: number
    }
}

type PostCardProps = {
    post: PostCardPost,
    postNumber: number
}

export default function PostCard({ post, postNumber }: PostCardProps) {
    return (
        <article className={styles.card}>
            <aside className={styles.author}>
                <Image src={post.character.imageUrl} alt={post.character.name} width={224} height={358}
                    className={styles.avatar} />
                <span className={styles.characterName}>{post.character.name}</span>
                <span className={styles.postCount}>{post.character.postCount} hozzászólás</span>
                <div className={styles.actions}>
                    <button type="button" className={styles.iconBtn} title="Privát üzenet küldése">
                        <Icon name="mail"/>
                    </button>
                    <button type="button" className={styles.iconBtn} title="Értesítés beállítása">
                        <Icon name="notifications"/>
                    </button>
                </div>
            </aside>
            <div className={styles.body}>
                <header className={styles.postHeader}>
                    <div>
                        <h3 className={styles.postTitle}>{post.gameTitle}</h3>
                        <time dateTime={post.createdAt} className={styles.date}>
                            {formatDateTime(post.createdAt)}
                        </time>
                    </div>
                    <div className={styles.actions}>
                        <span className={styles.postNumber}>#{postNumber}</span>
                        <button type="button" className={styles.iconBtn} title="Szerkesztés">
                            <Icon name="edit"/>
                        </button>
                        <button type="button" className={styles.iconBtn} title="Törlés">
                            <Icon name="delete"/>
                        </button>
                    </div>
                </header>
                <p className={styles.content}>{post.content}</p>
            </div>
        </article>
    );
}
