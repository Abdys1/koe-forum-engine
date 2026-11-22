"use client"

import clsx from "clsx";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import Icon from "@/components/atoms/Icon/Icon";
import { useDismissable } from "@/hooks/useDismissable";

import { SidebarMenuItem } from "./menuItems";
import * as styles from "./Sidebar.css";
import SidebarCharacterBlock, { SidebarCharacter } from "./SidebarCharacterBlock";
import SidebarMenu from "./SidebarMenu";

export type SidebarPanelProps = {
    characters: SidebarCharacter[],
    activeCharacter: SidebarCharacter | undefined,
    selectionFailed: boolean,
    menuItems: SidebarMenuItem[],
    pathname: string,
    onSelectCharacter: (characterId: number) => void,
    onLogout: () => void
}

export default function SidebarPanel(
    { characters, activeCharacter, selectionFailed, menuItems, pathname, onSelectCharacter, onLogout }: SidebarPanelProps
) {
    const sidebarRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useDismissable(sidebarRef, isOpen, close);

    useEffect(() => {
        close();
    }, [pathname, close]);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (isOpen && target.closest("a")) {
            close();
        } else if (!isOpen && !target.closest("a, button")) {
            open();
        }
    };

    return (
        <div className={styles.slot}>
            <aside ref={sidebarRef} className={clsx(styles.sidebar, isOpen && styles.sidebarOpen)}
                onClick={handleClick}>
                {isOpen && (
                    <button type="button" className={styles.collapseBtn} aria-label="Menüsáv összecsukása" onClick={close}>
                        <Icon name="chevron_left" className={styles.collapseIcon}/>
                    </button>
                )}
                <SidebarCharacterBlock characters={characters} activeCharacter={activeCharacter} isOpen={isOpen}
                    selectionFailed={selectionFailed} onOpen={open} onSelectCharacter={onSelectCharacter}/>
                <SidebarMenu items={menuItems} pathname={pathname} isOpen={isOpen} onLogout={onLogout}/>
            </aside>
        </div>
    );
}
