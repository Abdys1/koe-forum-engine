import SocialLink from "@/components/SocialLink/SocialLink";
import { SocialLink as SocialLinkData } from "@/lib/socialLinks";
import { socialLinkList } from "@/styles/shared.css";
import * as styles from "./Footer.css";

type FooterProps = {
  socialLinks: SocialLinkData[]
}

export default function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <a href="/" className={styles.logo}>Gloamfall</a>
      <p className={styles.copyright}>&copy; 2026 Gloamfall. All rights reserved.</p>
      <div className={socialLinkList}>
        {socialLinks.map(link => (
          <SocialLink key={link.label} link={link} />
        ))}
      </div>
    </footer>
  );
}
