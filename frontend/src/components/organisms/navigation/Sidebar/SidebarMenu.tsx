import clsx from "clsx";
import Link from "next/link";

import Icon from "@/components/atoms/Icon/Icon";

import { isCurrentPage, SidebarMenuItem } from "./menuItems";
import * as styles from "./Sidebar.css";

type SidebarMenuProps = {
    items: SidebarMenuItem[],
    pathname: string,
    isOpen: boolean,
    onLogout: () => void
}

export default function SidebarMenu({ items, pathname, isOpen, onLogout }: SidebarMenuProps) {
    const currentPage = (item: SidebarMenuItem) => isCurrentPage(item, pathname) ? "page" : undefined;

    return (
        <nav className={isOpen ? styles.tileMenu : styles.menu} aria-label="Főmenü">
            {isOpen ? (
                <div className={styles.tileGrid}>
                    {items.map((item, index) => (
                        <Link key={item.label} href={item.href} className={styles.tile}
                            style={{ animationDelay: `${120 + index * 35}ms` }}
                            aria-current={currentPage(item)}>
                            <Icon name={item.icon} className={styles.tileIcon}/>
                            <span className={styles.tileLabel}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                items.map(item => (
                    <Link key={item.label} href={item.href} className={styles.menuItem}
                        aria-current={currentPage(item)}
                        aria-label={item.label} title={item.label}>
                        <Icon name={item.icon} className={styles.menuIcon}/>
                    </Link>
                ))
            )}
            <button type="button" className={isOpen ? styles.logoutBtn : clsx(styles.menuItem, styles.logout)}
                aria-label={isOpen ? undefined : "Kijelentkezés"}
                title={isOpen ? undefined : "Kijelentkezés"}
                onClick={onLogout}>
                <Icon name="logout" className={isOpen ? styles.logoutIcon : styles.menuIcon}/>
                {isOpen && "Kijelentkezés"}
            </button>
        </nav>
    );
}
