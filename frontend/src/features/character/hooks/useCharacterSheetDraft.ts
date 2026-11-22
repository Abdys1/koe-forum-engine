import { useState } from "react";

import { Character, CharacterQuote } from "@/features/character/model/character";
import { useObjectUrl } from "@/hooks/useObjectUrl";

export interface CharacterSheetDraft {
    imageUrl: string,
    changeImage: (file: File) => void,
    appearance: string | undefined,
    setAppearance: (value: string) => void,
    backstory: string | undefined,
    setBackstory: (value: string) => void,
    secrets: string | undefined,
    setSecrets: (value: string) => void,
    notes: string | undefined,
    setNotes: (value: string) => void,
    quote: CharacterQuote | undefined,
    setQuote: (quote: CharacterQuote) => void
}

export function useCharacterSheetDraft(character: Character): CharacterSheetDraft {
    const [imageFile, setImageFile] = useState<File>();
    const [appearance, setAppearance] = useState(character.appearance);
    const [backstory, setBackstory] = useState(character.backstory);
    const [secrets, setSecrets] = useState(character.secrets);
    const [notes, setNotes] = useState(character.notes);
    const [quote, setQuote] = useState(character.quote);
    const imageUrl = useObjectUrl(imageFile) ?? character.imageUrl;

    return {
        imageUrl,
        changeImage: setImageFile,
        appearance, setAppearance,
        backstory, setBackstory,
        secrets, setSecrets,
        notes, setNotes,
        quote, setQuote
    };
}
