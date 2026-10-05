import { SocialLink as SocialLinkData } from "@/lib/socialLinks";
import { socialLink } from "@/styles/shared.css";

type SocialLinkProps = {
    link: SocialLinkData
}

export default function SocialLink({ link }: SocialLinkProps) {
    return (
        <a href={link.href} className={socialLink} aria-label={link.label} title={link.label}>
            {link.icon}
        </a>
    );
}
