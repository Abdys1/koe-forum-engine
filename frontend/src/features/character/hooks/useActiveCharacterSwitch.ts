import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { selectActiveCharacter } from "@/features/character/actions/selectActiveCharacter";
import { resolveActiveCharacter } from "@/features/character/model/activeCharacter";
import { CharacterDetails } from "@/lib/api/character/types";

export interface ActiveCharacterSwitch {
    activeCharacter: CharacterDetails | undefined,
    selectCharacter: (characterId: number) => Promise<void>,
    selectionFailed: boolean
}

export function useActiveCharacterSwitch(characters: CharacterDetails[]): ActiveCharacterSwitch {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [pendingCharacterId, setPendingCharacterId] = useState<number | null>(null);
    const [selectionFailed, setSelectionFailed] = useState(false);

    const activeCharacter = resolveActiveCharacter(characters, pendingCharacterId ?? session?.user.activeCharacterId ?? null);

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

    return { activeCharacter, selectCharacter, selectionFailed };
}
