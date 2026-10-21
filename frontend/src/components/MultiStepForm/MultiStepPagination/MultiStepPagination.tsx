import Button from "@/components/Button/Button";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import * as styles from "./MultiStepPagination.css";

interface MultiStepPaginationProps {
    onPrevStep?: React.MouseEventHandler<HTMLElement>,
    onNextStep?: React.MouseEventHandler<HTMLElement>,
    nextDisabled?: boolean
}

export default function MultiStepPagination(props: MultiStepPaginationProps) {
    const formState = useMultiStepFormContext();
    const isLastStep = formState.actualStep === formState.steps.length - 1;

    return (
        <div className={styles.pagination}>
            <div className={styles.left}>
                {formState.actualStep !== 0 && (
                    <Button variant="ghost" size="medium" title="Vissza" onClick={props.onPrevStep || formState.onPrevStep}/>
                )}
            </div>
            <div className={styles.right}>
                {formState.canReturnToSummary && (
                    <Button variant="outline" size="medium" icon="fact_check" title="Vissza az áttekintéshez"
                        onClick={() => formState.goToStep(formState.steps.length - 1)}/>
                )}
                {!isLastStep && (
                    <Button variant="gold" size="medium" title="Tovább" disabled={props.nextDisabled}
                        onClick={props.onNextStep || formState.onNextStep}/>
                )}
                {isLastStep && (
                    <Button variant="gold" size="medium" type="submit" title="Karakter létrehozása" className={styles.createBtn}/>
                )}
            </div>
        </div>
    );
}
