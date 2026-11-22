export type SocialNetwork = "discord" | "instagram" | "facebook";

export interface SocialLinkData {
    network: SocialNetwork,
    label: string,
    href?: string
}

export const socialLinks: SocialLinkData[] = [
    { network: "discord", label: "Discord" },
    { network: "instagram", label: "Instagram" },
    { network: "facebook", label: "Facebook" }
];

export function findSocialLink(network: SocialNetwork): SocialLinkData {
    return socialLinks.find(link => link.network === network) ?? { network, label: network };
}
