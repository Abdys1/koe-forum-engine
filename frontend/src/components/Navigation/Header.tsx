import Image from "next/image";

import * as styles from "./Header.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Gloamfall</a>
        <div className={styles.menu}>
          <a href="#" className={styles.menuItem}>Világ</a>
          <a href="#" className={styles.menuItem}>Karakter alkotás</a>
          <a href="/roleplay-area" className={styles.menuItem}>Játéktér</a>
          <a href="#" className={styles.mapBtn} aria-label="Térkép" title="Térkép">
            <Image
              src="/images/compass.png"
              alt="Térkép"
              width={100}
              height={100}
              className={styles.mapIcon}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
