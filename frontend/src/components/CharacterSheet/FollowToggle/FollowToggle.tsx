import clsx from "clsx";
import { useState } from "react";

import * as styles from "./FollowToggle.css";

export default function FollowToggle() {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <button type="button" aria-pressed={isFollowing}
            className={clsx(styles.followBtn, isFollowing && styles.followBtnActive)}
            onClick={() => setIsFollowing(following => !following)}>
            <span className={clsx("material-icons", styles.followIcon)} aria-hidden="true">
                {isFollowing ? "notifications_active" : "notifications"}
            </span>
            {isFollowing ? "Követem a játékait" : "Karakter játékának követése"}
        </button>
    );
}
