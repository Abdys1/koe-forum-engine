import clsx from "clsx";
import Image from "next/image";

import Icon from "@/components/atoms/Icon/Icon";

import * as styles from "./PortraitFrame.css";

type PortraitAction = {
    icon: string,
    text: string
}

type PortraitFrameProps = {
    imageUrl?: string,
    imageAlt?: string,
    placeholder?: PortraitAction,
    overlay: PortraitAction,
    size?: keyof typeof styles.frameSizes
} & (
    | { htmlFor: string, onClick?: never, label?: never }
    | { onClick: () => void, label: string, htmlFor?: never }
);

function ActionContent({ icon, text }: PortraitAction) {
    return <>
        <Icon name={icon} className={styles.actionIcon}/>
        <span className={styles.actionText}>{text}</span>
    </>;
}

const imageSizes: Record<keyof typeof styles.frameSizes, string> = {
    medium: "224px",
    large: "272px"
};

export default function PortraitFrame({ imageUrl, imageAlt = "", placeholder, overlay, size = "medium", ...props }: PortraitFrameProps) {
    const frameClassName = clsx(styles.frame, styles.frameSizes[size]);
    const content = imageUrl
        ? <>
            <Image src={imageUrl} alt={imageAlt} fill sizes={imageSizes[size]} className={styles.image}/>
            <span className={styles.overlay}><ActionContent {...overlay}/></span>
          </>
        : placeholder && <span className={styles.placeholder}><ActionContent {...placeholder}/></span>;

    if (props.htmlFor !== undefined) {
        return <label htmlFor={props.htmlFor} className={frameClassName}>{content}</label>;
    }

    return (
        <button type="button" onClick={props.onClick} aria-label={props.label} className={frameClassName}>
            {content}
        </button>
    );
}
