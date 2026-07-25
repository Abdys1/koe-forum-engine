import ComponentHeading from "@/components/ComponentHeading/ComponentHeading";
import MultiStepBar from "@/components/MultiStepForm/MultiStepBar/MultiStepBar";
import { FormContextState, MultiStepFormContext, useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import MultiStepPagination from "@/components/MultiStepForm/MultiStepPagination/MultiStepPagination";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import clsx from "clsx";
import * as styles from "./MultiStepForm.css";

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

    return (
        <form style={style} className={clsx(styles.step, className)}>
            <div className={styles.stepHeader}>
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
