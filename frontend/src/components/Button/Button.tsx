import clsx from "clsx";
import Link from "next/link";
import * as styles from "./Button.css";

type ButtonProps = {
    title: string,
    variant?: keyof typeof styles.variants,
    size?: keyof typeof styles.sizes,
    className?: string
} & (
    | { href: string, onClick?: never, type?: never, disabled?: never }
    | {
        href?: never,
        onClick?: React.MouseEventHandler<HTMLButtonElement>,
        type?: "button" | "submit" | "reset",
        disabled?: boolean
    }
);

export default function Button({ title, variant = "primary", size = "large", className, ...props }: ButtonProps) {
    const classNames = clsx(styles.base, styles.sizes[size], styles.variants[variant], className);

    if (props.href !== undefined) {
        return <Link href={props.href} className={classNames}>{title}</Link>;
    }

    return (
        <button type={props.type ?? "button"} className={classNames} onClick={props.onClick} disabled={props.disabled}>
            {title}
        </button>
    );
}
