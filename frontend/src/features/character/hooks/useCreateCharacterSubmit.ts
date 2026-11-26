import { useRouter } from "next/navigation";

import { createCharacter } from "@/features/character/actions/createCharacter";
import { CharacterFormError, isCharacterErrorCode, toCharacterFormErrors } from "@/features/character/model/characterValidation";
import { CharacterInputs, toCreateCharacterFormData } from "@/features/character/model/createCharacter";

export function useCreateCharacterSubmit(onErrors: (errors: CharacterFormError[]) => void): (values: CharacterInputs) => Promise<void> {
    const router = useRouter();

    return async values => {
        const result = await createCharacter(toCreateCharacterFormData(values));
        if (!result.success) {
            const unhandledErrorCodes = result.errorCodes.filter(errorCode => !isCharacterErrorCode(errorCode));
            if (unhandledErrorCodes.length) {
                console.error(unhandledErrorCodes);
            }
            onErrors(toCharacterFormErrors(result.errorCodes));
            return;
        }
        router.push(`/character/${result.characterId}`);
    };
}
