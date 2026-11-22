import CharacterTemplate from "@/components/templates/CharacterTemplate/CharacterTemplate";
import { getCharacterSheet } from "@/features/character/queries/getCharacterSheet";

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const characterSheet = await getCharacterSheet(id);

    return <CharacterTemplate characterSheet={characterSheet} canEdit={false} canViewPrivate={false}/>;
}
