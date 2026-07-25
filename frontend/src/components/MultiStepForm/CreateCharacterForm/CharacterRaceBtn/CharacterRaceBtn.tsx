import clsx from "clsx";
import * as styles from "./CharacterRaceBtn.css";

type CharacterRaceBtnProps = {
    title: string,
    active?: boolean,
    img: string,
    onClick?: React.MouseEventHandler<HTMLElement>
};

export default function CharacterRaceBtn({ title, img, active = false, onClick }: CharacterRaceBtnProps) {
    return (
        <li className={clsx(styles.btn, active ? styles.btnActive : styles.btnInactive)} onClick={onClick}>
            <img src={img} className={styles.btnImg} alt="faj"/>
            <span className={styles.btnLabel}>{title}</span>
        </li>
    );
}
