export function splitParagraphs(text: string | undefined): string[] {
    const trimmed = text?.trim();
    return trimmed ? trimmed.split(/\n\s*\n/) : [];
}
