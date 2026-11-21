import { SelectionResult } from "@/lib/equipmentCatalog";

export function applySelection(itemId: number, selectedIds: number[], result: SelectionResult): number[] {
    if (result.kind === "add") return [...selectedIds, itemId];
    if (result.kind === "replace") {
        return [...selectedIds.filter((_, index) => !result.indices.includes(index)), itemId];
    }
    return selectedIds;
}

export function compactSelection(ids: readonly (number | null | undefined)[] | undefined): number[] {
    return (ids ?? []).filter((id): id is number => typeof id === "number");
}
