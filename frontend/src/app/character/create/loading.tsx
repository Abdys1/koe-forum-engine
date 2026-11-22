import StatusMessage from "@/components/molecules/StatusMessage/StatusMessage";
import CreateCharacterTemplate from "@/components/templates/CreateCharacterTemplate/CreateCharacterTemplate";

export default function CharacterCreateLoading() {
    return (
        <CreateCharacterTemplate>
            <StatusMessage role="status">Betöltés…</StatusMessage>
        </CreateCharacterTemplate>
    );
}
