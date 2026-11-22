export function toSameOriginPath(url: string | undefined, origin: string): string {
    if (!url) {
        return "/";
    }
    try {
        const target = new URL(url, origin);
        return target.origin === origin ? `${target.pathname}${target.search}${target.hash}` : "/";
    } catch {
        return "/";
    }
}
