"use client"

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { MouseEvent as ReactMouseEvent, useEffect, useId, useRef, useState } from "react";

import DropdownSelect from "@/components/Inputs/DropdownSelect/DropdownSelect";
import { selectActiveCharacter } from "@/features/character/actions/selectActiveCharacter";
import { CharacterDetails } from "@/lib/api/character/types";

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

type SidebarPanelProps = {
    characters: CharacterDetails[]
}

export default function SidebarPanel({ characters }: SidebarPanelProps) {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    if (status !== "authenticated" || session.error || pathname.startsWith("/auth/")) {
        return null;
    }

    return <SidebarContent characters={characters} />;
}

function SidebarContent({ characters }: SidebarPanelProps) {
    const characterSelectLabelId = useId();
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { data: session, update } = useSession();
    const [pendingCharacterId, setPendingCharacterId] = useState<number | null>(null);
    const [selectionFailed, setSelectionFailed] = useState(false);

    const selectedCharacterId = pendingCharacterId ?? session?.user.activeCharacterId ?? null;
    const activeCharacter = characters.find(character => character.id === selectedCharacterId) ?? characters[0];
    const characterOptions = characters.map(character => ({ value: character.id, label: character.name }));

    const selectCharacter = async (characterId: number) => {
        if (pendingCharacterId !== null || characterId === activeCharacter?.id) {
            return;
        }
        setPendingCharacterId(characterId);
        setSelectionFailed(false);
        const { success } = await selectActiveCharacter(characterId);
        if (success) {
            await update();
            router.refresh();
        } else {
            setSelectionFailed(true);
        }
        setPendingCharacterId(null);
    };

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
                            {activeCharacter ? (
                                <Image src={activeCharacter.imageUrl} alt={activeCharacter.name} width={128} height={128}
                                    className={styles.avatar} />
                            ) : (
                                <span className={clsx("material-icons", styles.avatar, styles.avatarPlaceholder)}>
                                    person_add
                                </span>
                            )}
                        </button>
                        {isOpen && (
                            <div className={styles.characterInfo}>
                                {activeCharacter ? (
                                    <>
                                        <Link href={`/character/${activeCharacter.id}`} className={styles.characterName}
                                            title="Karakterlap megnyitása">
                                            {activeCharacter.name}
                                        </Link>
                                        <Link href="/character" className={styles.myCharactersBtn}>
                                            Karaktereim
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/character/create" className={styles.myCharactersBtn}>
                                        Karakter létrehozása
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                    {isOpen && activeCharacter && (
                        <div className={styles.characterSwitch}>
                            <span id={characterSelectLabelId} className={styles.characterSwitchLabel}>
                                Karakterváltás
                            </span>
                            <DropdownSelect options={characterOptions} value={activeCharacter.id}
                                labelId={characterSelectLabelId} onChange={selectCharacter} size="large" />
                            {selectionFailed && (
                                <p role="alert" className={styles.characterSwitchError}>
                                    Nem sikerült karaktert váltani, próbáld újra!
                                </p>
                            )}
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
