import * as styles from "./Footer.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="/" className={styles.logo}>Gloamfall</a>
      <p className={styles.copyright}>&copy; 2026 Gloamfall. All rights reserved.</p>
    </footer>
  );
}
