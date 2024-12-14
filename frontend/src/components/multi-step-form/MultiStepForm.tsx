import ComponentHeading from "@/components/ComponentHeading";
import MultiStepBar from "@/components/multi-step-form/MultiStepBar";
import { FormContextState, MultiStepFormContext, useMultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";
import MultiStepPagination from "@/components/multi-step-form/MultiStepPagination";
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
        form,
        steps,
        actualStep,
        onPrevStep: prevStep,
        onNextStep: nextStep
    };

    return (
        <MultiStepFormContext.Provider value={formState}>
            {React.Children.map(children, (child, i) => {
                if (i === actualStep) return child;
            })}
        </MultiStepFormContext.Provider>
    );
}

interface StepProps {
    label: string,
    validate?: () => Promise<boolean>,
    className?: string,
    style?: React.CSSProperties
    children: JSX.Element
}

function Step({ children, validate, style, className }: StepProps) {
    const { onNextStep } = useMultiStepFormContext();

    async function nextStep(e: React.MouseEvent<HTMLButtonElement>) {
        if (validate && !(await validate())) {
            return;
        }
        onNextStep(e);
    }

    return(
        <form style={style} className={`relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
            ${className ?? ""}
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0`}>
            <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                <ComponentHeading title="Karakter létrehozása" />
                <MultiStepBar/>
            </div>
            {children}
            <MultiStepPagination onNextStep={nextStep}/>
        </form>
    );
}

MultiStepForm.Step = Step;

export default MultiStepForm;