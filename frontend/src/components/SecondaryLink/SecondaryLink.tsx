import Link from "next/link";
import * as styles from "./SecondaryLink.css";

type SecondaryLinkProps = {
    children: React.ReactNode,
    href: string
}

export default function SecondaryLink({ children, href }: SecondaryLinkProps) {
    return (
        <Link href={href} className={styles.link}>
            {children}
        </Link>
    )
}
