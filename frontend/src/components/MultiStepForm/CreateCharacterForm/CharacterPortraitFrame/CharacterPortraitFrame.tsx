import clsx from "clsx";
import Image from "next/image";
import * as styles from "./CharacterPortraitFrame.css";

type PortraitAction = {
    icon: string,
    text: string
}

type CharacterPortraitFrameProps = {
    imageUrl?: string,
    imageAlt?: string,
    placeholder?: PortraitAction,
    overlay: PortraitAction
} & (
    | { htmlFor: string, onClick?: never, label?: never }
    | { onClick: () => void, label: string, htmlFor?: never }
);

function ActionContent({ icon, text }: PortraitAction) {
    return <>
        <span className={clsx("material-icons", styles.actionIcon)} aria-hidden="true">{icon}</span>
        <span className={styles.actionText}>{text}</span>
    </>;
}

export default function CharacterPortraitFrame({ imageUrl, imageAlt = "", placeholder, overlay, ...props }: CharacterPortraitFrameProps) {
    const content = imageUrl
        ? <>
            <Image src={imageUrl} alt={imageAlt} fill sizes="224px" className={styles.image}/>
            <span className={styles.overlay}><ActionContent {...overlay}/></span>
          </>
        : placeholder && <span className={styles.placeholder}><ActionContent {...placeholder}/></span>;

    if (props.htmlFor !== undefined) {
        return <label htmlFor={props.htmlFor} className={styles.frame}>{content}</label>;
    }

    return (
        <button type="button" onClick={props.onClick} aria-label={props.label} className={styles.frame}>
            {content}
        </button>
    );
}
