import MultiStepLabel from "@/components/molecules/MultiStepLabel/MultiStepLabel";
import { useMultiStepFormContext } from "@/components/organisms/form/MultiStepForm/MultiStepFormContext";

import * as styles from "./MultiStepBar.css";
import { getProgressPercent, getStepStatus } from "./stepNavigation";

export default function MultiStepBar() {
    const formState = useMultiStepFormContext();

    return (
        <ul style={{'--progressLine': `${getProgressPercent(formState.actualStep, formState.steps.length)}%`} as React.CSSProperties}
            className={styles.bar}>
            {formState.steps.map((step, i) => (
                <MultiStepLabel key={i} label={step} stepNum={i + 1} status={getStepStatus(i, formState.actualStep)} />
            ))}
        </ul>
    );
}
