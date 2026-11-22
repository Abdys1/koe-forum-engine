import { BaseSyntheticEvent, createContext, MouseEventHandler, ReactNode, useContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormContextState<Values extends FieldValues = FieldValues> {
    form: UseFormReturn<Values>,
    actualStep: number,
    steps: string[],
    header?: ReactNode,
    onPrevStep: MouseEventHandler<HTMLElement>,
    onNextStep: MouseEventHandler<HTMLElement>,
    goToStep: (step: number) => void,
    canReturnToSummary: boolean,
    onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
}

export const MultiStepFormContext = createContext<FormContextState | undefined>(undefined);

export function useMultiStepFormContext<Values extends FieldValues = FieldValues>(): FormContextState<Values> {
    const context = useContext(MultiStepFormContext);
    if (!context) {
        throw new Error('MultiStepFormContext undefined!');
    }
    return context as unknown as FormContextState<Values>;
}
