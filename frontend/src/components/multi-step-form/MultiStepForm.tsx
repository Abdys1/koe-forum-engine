import ComponentHeading from "@/components/ComponentHeading";
import MultiStepBar from "@/components/multi-step-form/MultiStepBar";
import { FormContextState, MultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface MultiStepFormProps {
    form: UseFormReturn<any, any, undefined>,
    children: React.ReactElement<StepProps>[]
}

function MultiStepForm({ form, children }: MultiStepFormProps) {
    const [actualStep, setActualStep] = useState(0);

    function nextStep() {
        setActualStep(actualStep + 1);
    }

    function prevStep() {
        setActualStep(actualStep - 1);
    }

    const steps: string[] = React.Children.map(children, child => child.props.label);
    
    const formState: FormContextState = {
        form: form,
        steps: steps,
        actualStep: actualStep,
        onPrevStep: prevStep,
        onNextStep: nextStep
    };

    return (
        <>
            <MultiStepFormContext.Provider value={formState}>
                {React.Children.map(children, (child, i) => {
                    if (i === actualStep) return child;
                })}
            </MultiStepFormContext.Provider>
        </>
    );
}

interface StepProps {
    label: string,
    children: JSX.Element
}

function Step({ children }: StepProps) {
    return <>{children}</>;
}

MultiStepForm.Step = Step;

export default MultiStepForm;