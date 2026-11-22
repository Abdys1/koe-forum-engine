import SocialLink from "@/components/atoms/SocialLink/SocialLink";
import { SocialLinkData } from "@/features/community/model/socialLinks";

import * as styles from "./Footer.css";

type FooterProps = {
  socialLinks: SocialLinkData[]
}

export default function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <a href="/" className={styles.logo}>Gloamfall</a>
      <p className={styles.copyright}>&copy; 2026 Gloamfall. All rights reserved.</p>
      <div className={styles.socialLinks}>
        {socialLinks.map(link => (
          <SocialLink key={link.network} {...link} />
        ))}
      </div>
    </footer>
  );
}
