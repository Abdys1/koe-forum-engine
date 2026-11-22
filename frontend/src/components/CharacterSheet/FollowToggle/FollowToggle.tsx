import clsx from "clsx";
import { useState } from "react";

import Icon from "@/components/atoms/Icon/Icon";

import * as styles from "./FollowToggle.css";

export default function FollowToggle() {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <button type="button" aria-pressed={isFollowing}
            className={clsx(styles.followBtn, isFollowing && styles.followBtnActive)}
            onClick={() => setIsFollowing(following => !following)}>
            <Icon name={isFollowing ? "notifications_active" : "notifications"} className={styles.followIcon}/>
            {isFollowing ? "Követem a játékait" : "Karakter játékának követése"}
        </button>
    );
}
