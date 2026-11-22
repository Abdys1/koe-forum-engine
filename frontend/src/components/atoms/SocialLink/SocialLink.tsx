import SocialIcon, { SocialNetwork } from "@/components/atoms/SocialIcon/SocialIcon";

import * as styles from "./SocialLink.css";

type SocialLinkProps = {
    network: SocialNetwork,
    label: string,
    href?: string
}

export default function SocialLink({ network, label, href }: SocialLinkProps) {
    return (
        <a href={href} className={styles.link} aria-label={label} title={label}>
            <SocialIcon network={network}/>
        </a>
    );
}
