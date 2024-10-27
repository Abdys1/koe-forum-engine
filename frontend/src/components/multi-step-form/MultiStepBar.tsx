import { useMultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";
import MultiStepLabel from "@/components/multi-step-form/MultiStepLabel";

export default function MultiStepBar() {
    const formState = useMultiStepFormContext();

    function getStepStatus(stepIndex: number): "active" | "done" | "unfinished" {
        if(stepIndex === formState.actualStep) {
            return "active";
        } else if(stepIndex < formState.actualStep) {
            return "done";
        } else {
            return "unfinished";
        }
    }

    return(
        <ul style={{'--progressLine': `${(100 / (formState.steps.length - 1)) * formState.actualStep}%`} as React.CSSProperties} className={`relative w-full max-w-xl mb-6 flex justify-between items-center
            before:content-[''] before:absolute before:top-[50%] before:w-full before:h-[4px] before:translate-y-[-50%] before:bg-cardMediumBg
            after:content-[''] after:absolute after:top-[50%] after:left-0 after:w-[var(--progressLine)] after:h-[4px] after:translate-y-[-50%] after:bg-mainHover`}>
        {
        formState.steps.map((step, i) => {
            return(
                <MultiStepLabel key={i} label={step} stepNum={i + 1} status={getStepStatus(i)} />
            );
        })
        }
        </ul>
    );
}