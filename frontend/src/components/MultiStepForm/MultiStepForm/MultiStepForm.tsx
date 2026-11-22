import clsx from "clsx";
import React, { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import MultiStepBar from "@/components/MultiStepForm/MultiStepBar/MultiStepBar";
import { FormContextState, MultiStepFormContext, useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import MultiStepNavButton from "@/components/MultiStepForm/MultiStepNavButton/MultiStepNavButton";

import * as styles from "./MultiStepForm.css";

interface MultiStepFormProps {
    form: UseFormReturn<any, any, undefined>,
    header?: React.ReactNode,
    onSubmit: SubmitHandler<any>,
    children: React.ReactElement<StepProps>[]
}

function MultiStepForm({ form, header, onSubmit, children }: MultiStepFormProps) {
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
        header,
        onPrevStep: prevStep,
        onNextStep: nextStep,
        goToStep,
        canReturnToSummary,
        onSubmit: form.handleSubmit(onSubmit)
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
    className?: string,
    style?: React.CSSProperties
    children: JSX.Element
}

function Step({ children, validate, canProceed = true, style, className }: StepProps) {
    const { header, steps, actualStep, onPrevStep, onNextStep, goToStep, canReturnToSummary, onSubmit } = useMultiStepFormContext();
    const lastStep = steps.length - 1;

    async function nextStep(e: React.MouseEvent<HTMLButtonElement>) {
        if (validate && !(await validate())) {
            return;
        }
        onNextStep(e);
    }

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        if (actualStep < lastStep) {
            e.preventDefault();
            return;
        }
        await onSubmit(e);
    }

    return (
        <form style={style} className={clsx(styles.step, className)} onSubmit={submit}>
            <div className={clsx(styles.rail, styles.railPrev)}>
                {actualStep > 0 &&
                    <div className={styles.railInner}>
                        <MultiStepNavButton direction="prev" label={steps[actualStep - 1]} onClick={onPrevStep}/>
                    </div>
                }
            </div>
            <div className={styles.content}>
                {header ?? (
                    <header className={styles.stepHeader}>
                        <MultiStepBar/>
                    </header>
                )}
                <div className={styles.main}>{children}</div>
            </div>
            <div className={clsx(styles.rail, styles.railNext)}>
                {actualStep < lastStep &&
                    <div className={styles.railInner}>
                        <MultiStepNavButton direction="next" label={steps[actualStep + 1]} onClick={nextStep}
                                            disabled={!canProceed}/>
                        {canReturnToSummary &&
                            <div className={styles.railExtra}>
                                <MultiStepNavButton direction="summary" label={steps[lastStep]} onClick={() => goToStep(lastStep)}/>
                            </div>
                        }
                    </div>
                }
            </div>
        </form>
    );
}

MultiStepForm.Step = Step;

export default MultiStepForm;
