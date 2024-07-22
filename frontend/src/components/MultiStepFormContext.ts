import { createContext, useContext } from "react";
import { FormStep } from "@/components/types";

export interface FormContextState {
    actualStep: number,
    steps: FormStep[],
    onPrevStep: React.MouseEventHandler<HTMLElement>,
    onNextStep: React.MouseEventHandler<HTMLElement>
};

export const MultiStepFormContext = createContext<FormContextState | undefined>(undefined);

export function useMultiStepFormContext() {
    const context = useContext(MultiStepFormContext);
    if(!context) {
        throw new Error('MultiStepFormContext undefined!');
    }
    return context;
}