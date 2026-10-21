import clsx from "clsx";
import Image from "next/image";
import { forwardRef } from "react";
import * as styles from "./CharacterRaceBtn.css";

type CharacterRaceBtnProps = {
    title: string,
    active?: boolean,
    img: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
};

export default forwardRef<HTMLButtonElement, CharacterRaceBtnProps>(
    function CharacterRaceBtn({ title, img, active = false, onClick }, ref) {
        return (
            <li className={styles.item}>
                <button ref={ref} type="button" aria-pressed={active} tabIndex={active ? 0 : -1} onClick={onClick}
                    className={clsx(styles.btn, active && styles.btnActive)}>
                    <span className={styles.btnImgWrap}>
                        <Image src={img} alt="" fill sizes="9rem" draggable={false} className={styles.btnImg}/>
                    </span>
                    <span className={styles.btnLabel} title={title}>{title}</span>
                </button>
            </li>
        );
    }
);
