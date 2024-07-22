import MultiStepNavBtn from "@/components/MultiStepNavBtn";
import { useMultiStepFormContext } from "@/components/MultiStepFormContext";

export default function MultiStepPagination() {
    const formState = useMultiStepFormContext();
    return (
        <div className="relative py-2 w-full flex justify-between items-center z-10">
            <div className="relative">
                { formState.actualStep !== 0 && <MultiStepNavBtn type="button" title="Vissza" onClick={formState.onPrevStep}/> }
            </div>
            <div className="relative flex justify-end items-center">
                { formState.actualStep !== formState.steps.length - 1 && <MultiStepNavBtn type="button" title="Tovább" onClick={formState.onNextStep}/> }
                { formState.actualStep === formState.steps.length - 1 && <MultiStepNavBtn type="submit" title="Létrehozás"/> }
            </div>
        </div>
    );
}