"use client"

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { MouseEvent as ReactMouseEvent, useEffect, useId, useRef, useState } from "react";
import DropdownSelect from "@/components/Inputs/DropdownSelect/DropdownSelect";
import { playerCharacters } from "@/dummydata/characters";
import * as styles from "./Sidebar.css";

type MenuItem = {
    label: string,
    icon: string,
    href: string
}

const MENU_ITEMS: MenuItem[] = [
    { label: "Privát üzenetek", icon: "mail", href: "#" },
    { label: "Chat", icon: "chat", href: "#" },
    { label: "Hírek", icon: "newspaper", href: "#" },
    { label: "Lexikon", icon: "menu_book", href: "#" },
    { label: "Térkép", icon: "map", href: "#" },
    { label: "Játékon kívüli fórum", icon: "forum", href: "#" },
    { label: "Karakterlista", icon: "groups", href: "#" },
    { label: "Beállítások", icon: "settings", href: "#" },
];

const CHARACTER_OPTIONS = playerCharacters.map(character => ({ value: character.id, label: character.name }));

export default function Sidebar() {
    const characterSelectLabelId = useId();
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeCharacterId, setActiveCharacterId] = useState(playerCharacters[0].id);

    const activeCharacter = playerCharacters.find(character => character.id === activeCharacterId) ?? playerCharacters[0];

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const closeOnOutsideClick = (event: MouseEvent) => {
            if (!sidebarRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    const isCurrentPage = (item: MenuItem) => item.href !== "#" && pathname.startsWith(item.href);

    const openOnBackgroundClick = (event: ReactMouseEvent<HTMLElement>) => {
        if (!isOpen && !(event.target as HTMLElement).closest("a, button")) {
            setIsOpen(true);
        }
    };

    return (
        <div className={styles.slot}>
            <aside
                ref={sidebarRef}
                className={clsx(styles.sidebar, isOpen && styles.sidebarOpen)}
                onClick={openOnBackgroundClick}
                >
                {isOpen && (
                    <button
                        type="button"
                        className={styles.collapseBtn}
                        aria-label="Menüsáv összecsukása"
                        onClick={() => setIsOpen(false)}
                        >
                        <span className={clsx("material-icons", styles.collapseIcon)}>chevron_left</span>
                    </button>
                )}
                <div className={styles.characterBlock}>
                    <div className={styles.characterHeader}>
                        <button type="button" className={styles.avatarBtn} disabled={isOpen}
                            aria-expanded={isOpen} aria-label="Menüsáv kinyitása"
                            onClick={() => setIsOpen(true)}>
                            <Image src={activeCharacter.imageUrl} alt={activeCharacter.name} width={128} height={128}
                                className={styles.avatar} />
                        </button>
                        {isOpen && (
                            <div className={styles.characterInfo}>
                                <Link href={`/character/${activeCharacter.id}`} className={styles.characterName}
                                    title="Karakterlap megnyitása">
                                    {activeCharacter.name}
                                </Link>
                                <Link href="/character" className={styles.myCharactersBtn}>
                                    Karaktereim
                                </Link>
                            </div>
                        )}
                    </div>
                    {isOpen && (
                        <div className={styles.characterSwitch}>
                            <span id={characterSelectLabelId} className={styles.characterSwitchLabel}>
                                Karakterváltás
                            </span>
                            <DropdownSelect options={CHARACTER_OPTIONS} value={activeCharacterId}
                                labelId={characterSelectLabelId} onChange={setActiveCharacterId} size="large" />
                        </div>
                    )}
                </div>
                <nav className={isOpen ? styles.tileMenu : styles.menu} aria-label="Főmenü">
                    {isOpen ? (
                        <div className={styles.tileGrid}>
                            {MENU_ITEMS.map((item, index) => (
                                <Link key={item.label} href={item.href} className={styles.tile}
                                    style={{ animationDelay: `${120 + index * 35}ms` }}
                                    aria-current={isCurrentPage(item) ? "page" : undefined}>
                                    <span className={clsx("material-icons", styles.tileIcon)}>{item.icon}</span>
                                    <span className={styles.tileLabel}>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        MENU_ITEMS.map(item => (
                            <Link key={item.label} href={item.href} className={styles.menuItem}
                                aria-current={isCurrentPage(item) ? "page" : undefined}
                                aria-label={item.label} title={item.label}>
                                <span className={clsx("material-icons", styles.menuIcon)}>{item.icon}</span>
                            </Link>
                        ))
                    )}
                    <button type="button" className={isOpen ? styles.logoutBtn : clsx(styles.menuItem, styles.logout)}
                        aria-label={isOpen ? undefined : "Kijelentkezés"}
                        title={isOpen ? undefined : "Kijelentkezés"}
                        onClick={() => signOut()}>
                        <span className={clsx("material-icons", isOpen ? styles.logoutIcon : styles.menuIcon)}>
                            logout
                        </span>
                        {isOpen && "Kijelentkezés"}
                    </button>
                </nav>
            </aside>
        </div>
    );
}
