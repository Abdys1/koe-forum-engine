import Image from "next/image";
import { Post } from "@/dummydata/posts";
import * as styles from "./PostCard.css";

type PostCardProps = {
    post: Post,
    characterPostCount: number
}

const dateFormatter = new Intl.DateTimeFormat("hu-HU", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Budapest"
});

export default function PostCard({ post, characterPostCount }: PostCardProps) {
    return (
        <article className={styles.card}>
            <aside className={styles.author}>
                <Image src={post.character.imageUrl} alt={post.character.name} width={192} height={307}
                    className={styles.avatar} />
                <span className={styles.characterName}>{post.character.name}</span>
                <span className={styles.postCount}>{characterPostCount} hozzászólás</span>
                <button type="button" className={styles.iconBtn} title="Privát üzenet küldése">
                    <span className="material-icons">mail</span>
                </button>
            </aside>
            <div className={styles.body}>
                <header className={styles.postHeader}>
                    <div>
                        <h3 className={styles.postTitle}>{post.gameTitle}</h3>
                        <time dateTime={post.createdAt} className={styles.date}>
                            {dateFormatter.format(new Date(post.createdAt))}
                        </time>
                    </div>
                    <div className={styles.actions}>
                        <button type="button" className={styles.iconBtn} title="Feliratkozás">
                            <span className="material-icons">notifications</span>
                        </button>
                        <button type="button" className={styles.iconBtn} title="Szerkesztés">
                            <span className="material-icons">edit</span>
                        </button>
                        <button type="button" className={styles.iconBtn} title="Törlés">
                            <span className="material-icons">delete</span>
                        </button>
                    </div>
                </header>
                <p className={styles.content}>{post.content}</p>
            </div>
        </article>
    );
}
