import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import MultiStepLabel from "@/components/MultiStepForm/MultiStepLabel/MultiStepLabel";
import * as styles from "./MultiStepBar.css";

export default function MultiStepBar() {
    const formState = useMultiStepFormContext();

    function getStepStatus(stepIndex: number): "active" | "done" | "unfinished" {
        if (stepIndex === formState.actualStep) return "active";
        if (stepIndex < formState.actualStep) return "done";
        return "unfinished";
    }

    return (
        <ul style={{'--progressLine': `${(100 / (formState.steps.length - 1)) * formState.actualStep}%`} as React.CSSProperties}
            className={styles.bar}>
            {formState.steps.map((step, i) => (
                <MultiStepLabel key={i} label={step} stepNum={i + 1} status={getStepStatus(i)} />
            ))}
        </ul>
    );
}
