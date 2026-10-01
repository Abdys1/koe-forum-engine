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
          <a href="#" className={styles.mapBtn}>Térkép</a>
        </div>
      </nav>
    </header>
  );
}
