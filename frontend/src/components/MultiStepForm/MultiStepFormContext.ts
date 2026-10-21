import { createContext, ReactNode, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

// TODO legyen generikus
export interface FormContextState {
    form: UseFormReturn<any, any, undefined>,
    actualStep: number,
    steps: string[],
    aside?: ReactNode,
    onPrevStep: React.MouseEventHandler<HTMLElement>,
    onNextStep: React.MouseEventHandler<HTMLElement>,
    goToStep: (step: number) => void,
    canReturnToSummary: boolean
};

export const MultiStepFormContext = createContext<FormContextState | undefined>(undefined);

export function useMultiStepFormContext() {
    const context = useContext(MultiStepFormContext);
    if (!context) {
        throw new Error('MultiStepFormContext undefined!');
    }
    return context;
}
