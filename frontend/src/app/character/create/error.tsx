"use client"

import { useRouter } from "next/navigation";
import { startTransition } from "react";

import Button from "@/components/atoms/Button/Button";
import StatusMessage from "@/components/molecules/StatusMessage/StatusMessage";
import CreateCharacterTemplate from "@/components/templates/CreateCharacterTemplate/CreateCharacterTemplate";

export default function CharacterCreateError({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
    const router = useRouter();

    function retry() {
        startTransition(() => {
            router.refresh();
            reset();
        });
    }

    return (
        <CreateCharacterTemplate>
            <StatusMessage role="alert">
                <p>Nem sikerült betölteni a karakteralkotáshoz szükséges adatokat.</p>
                <Button title="Újrapróbálás" variant="outline" size="medium" onClick={retry}/>
            </StatusMessage>
        </CreateCharacterTemplate>
    );
}
