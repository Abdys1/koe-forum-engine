import { Sex } from "@/lib/api/character/types";

export type SelectableSex = "ferfi" | "no";

export interface SexOption {
    value: SelectableSex,
    label: string,
    icon: string
}

export const sexOptions: SexOption[] = [
    { value: "ferfi", label: "Férfi", icon: "male" },
    { value: "no", label: "Nő", icon: "female" }
];

export const sexLabels = Object.fromEntries(sexOptions.map(option => [option.value, option.label])) as Record<SelectableSex, string>;

export const sexMapping: Record<SelectableSex, Sex> = {
    ferfi: Sex.MALE,
    no: Sex.FEMALE
};

const selectableSexMapping: Record<Sex, SelectableSex> = {
    [Sex.MALE]: "ferfi",
    [Sex.FEMALE]: "no"
};

export function toSelectableSex(sex: Sex): SelectableSex {
    return selectableSexMapping[sex];
}
