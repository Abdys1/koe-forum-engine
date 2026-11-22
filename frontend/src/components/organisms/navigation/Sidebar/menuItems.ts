export interface SidebarMenuItem {
    label: string,
    icon: string,
    href: string
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
    { label: "Privát üzenetek", icon: "mail", href: "#" },
    { label: "Chat", icon: "chat", href: "#" },
    { label: "Hírek", icon: "newspaper", href: "#" },
    { label: "Lexikon", icon: "menu_book", href: "#" },
    { label: "Térkép", icon: "map", href: "#" },
    { label: "Játékon kívüli fórum", icon: "forum", href: "#" },
    { label: "Karakterlista", icon: "groups", href: "#" },
    { label: "Beállítások", icon: "settings", href: "#" },
];

export function isCurrentPage(item: SidebarMenuItem, pathname: string): boolean {
    return item.href !== "#" && pathname.startsWith(item.href);
}
