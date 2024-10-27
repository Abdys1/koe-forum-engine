import MultiStepNavBtn from "@/components/multi-step-form/MultiStepNavBtn";
import { useMultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";

interface MultiStepPaginationProps {
    onPrevStep?: React.MouseEventHandler<HTMLElement>,
    onNextStep?: React.MouseEventHandler<HTMLElement>
}

export default function MultiStepPagination(props: MultiStepPaginationProps) {
    const formState = useMultiStepFormContext();
    return (
        <div className="relative py-2 w-full flex justify-between items-center z-10">
            <div className="relative">
                { formState.actualStep !== 0 && <MultiStepNavBtn type="button" title="Vissza" onClick={props.onPrevStep || formState.onPrevStep}/> }
            </div>
            <div className="relative flex justify-end items-center">
                { formState.actualStep !== formState.steps.length - 1 && <MultiStepNavBtn type="button" title="Tovább" onClick={props.onNextStep || formState.onNextStep}/> }
                { formState.actualStep === formState.steps.length - 1 && <MultiStepNavBtn type="submit" title="Létrehozás"/> }
            </div>
        </div>
    );
}