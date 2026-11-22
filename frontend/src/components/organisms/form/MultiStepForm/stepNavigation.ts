export type StepStatus = "active" | "done" | "unfinished";

export function getStepStatus(stepIndex: number, actualStep: number): StepStatus {
    if (stepIndex === actualStep) return "active";
    if (stepIndex < actualStep) return "done";
    return "unfinished";
}

export function getProgressPercent(actualStep: number, stepCount: number): number {
    return stepCount > 1 ? (100 / (stepCount - 1)) * actualStep : 0;
}

export function canReturnToSummary(summaryReached: boolean, actualStep: number, stepsComplete: boolean[]): boolean {
    const lastStep = stepsComplete.length - 1;
    return summaryReached && actualStep < lastStep && stepsComplete.slice(actualStep, lastStep).every(Boolean);
}
