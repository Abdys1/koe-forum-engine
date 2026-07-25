import MultiStepNavBtn from "@/components/MultiStepForm/MultiStepNavBtn/MultiStepNavBtn";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import * as styles from "./MultiStepPagination.css";

interface MultiStepPaginationProps {
    onPrevStep?: React.MouseEventHandler<HTMLElement>,
    onNextStep?: React.MouseEventHandler<HTMLElement>
}

export default function MultiStepPagination(props: MultiStepPaginationProps) {
    const formState = useMultiStepFormContext();
    return (
        <div className={styles.pagination}>
            <div className={styles.left}>
                {formState.actualStep !== 0 && (
                    <MultiStepNavBtn type="button" title="Vissza" onClick={props.onPrevStep || formState.onPrevStep}/>
                )}
            </div>
            <div className={styles.right}>
                {formState.actualStep !== formState.steps.length - 1 && (
                    <MultiStepNavBtn type="button" title="Tovább" onClick={props.onNextStep || formState.onNextStep}/>
                )}
                {formState.actualStep === formState.steps.length - 1 && (
                    <MultiStepNavBtn type="submit" title="Létrehozás"/>
                )}
            </div>
        </div>
    );
}
