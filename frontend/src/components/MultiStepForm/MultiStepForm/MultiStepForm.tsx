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
    aside?: React.ReactNode,
    children: React.ReactElement<StepProps>[]
}

function MultiStepForm({ form, aside, children }: MultiStepFormProps) {
    const [actualStep, setActualStep] = useState(0);
    const [summaryReached, setSummaryReached] = useState(false);
    const lastStep = React.Children.count(children) - 1;

    function nextStep() {
        goToStep(actualStep + 1);
    }

    function prevStep() {
        setActualStep(actualStep - 1);
    }

    function goToStep(step: number) {
        setActualStep(step);
        if (step === lastStep) setSummaryReached(true);
    }

    const steps: string[] = React.Children.map(children, child => child.props.label);
    const stepsComplete: boolean[] = React.Children.map(children, child => child.props.complete ?? child.props.canProceed ?? true);
    const canReturnToSummary = summaryReached && actualStep < lastStep && stepsComplete.slice(actualStep, lastStep).every(Boolean);

    const formState: FormContextState = {
        form,
        steps,
        actualStep,
        aside,
        onPrevStep: prevStep,
        onNextStep: nextStep,
        goToStep,
        canReturnToSummary
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
    canProceed?: boolean,
    complete?: boolean,
    hideAside?: boolean,
    className?: string,
    style?: React.CSSProperties
    children: JSX.Element
}

function Step({ children, validate, canProceed = true, hideAside = false, style, className }: StepProps) {
    const { aside, onNextStep } = useMultiStepFormContext();

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
            <div className={styles.body}>
                <div className={styles.main}>{children}</div>
                {aside && !hideAside && <aside className={styles.aside}>{aside}</aside>}
            </div>
            <MultiStepPagination onNextStep={nextStep} nextDisabled={!canProceed}/>
        </form>
    );
}

MultiStepForm.Step = Step;

export default MultiStepForm;
