import Link from "next/link";
import * as styles from "./PrimaryLink.css";

type PrimaryLinkProps = {
    children: React.ReactNode,
    href: string
}

export default function PrimaryLink({ children, href }: PrimaryLinkProps) {
    return (
        <Link href={href} className={styles.link}>
            {children}
        </Link>
    )
}
