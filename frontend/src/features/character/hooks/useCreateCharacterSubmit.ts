import { useRouter } from "next/navigation";

import { createCharacter } from "@/features/character/actions/createCharacter";
import { CharacterInputs, toCreateCharacterFormData } from "@/features/character/model/createCharacter";

export function useCreateCharacterSubmit(): (values: CharacterInputs) => Promise<void> {
    const router = useRouter();

    return async values => {
        const result = await createCharacter(toCreateCharacterFormData(values));
        if (!result.success) {
            console.error(result.errorCodes);
            return;
        }
        router.push(`/character/${result.characterId}`);
    };
}
