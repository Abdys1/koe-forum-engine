import type { CharacterQuote } from "@/features/character/model/character";

export const MAX_QUOTE_LENGTH = 300;

export interface CharacterQuoteDraft {
    text: string,
    locationId: string,
    postNumber: string
}

export function toCharacterQuote({ text, locationId, postNumber }: CharacterQuoteDraft): CharacterQuote | null {
    const trimmedText = text.trim();
    const parsedPostNumber = Number(postNumber);
    if (!trimmedText || trimmedText.length > MAX_QUOTE_LENGTH || !locationId) return null;
    if (!Number.isInteger(parsedPostNumber) || parsedPostNumber < 1) return null;
    return { text: trimmedText, locationId, postNumber: parsedPostNumber };
}
