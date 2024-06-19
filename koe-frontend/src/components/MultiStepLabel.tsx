import clsx from "clsx";

type MultiStepLabelProps = {
    label: string,
    stepNum: number,
    status: "active" | "done" | "unfinished"
};

export default function MultiStepLabel(props: MultiStepLabelProps) {
    return (
        <li className="relative flex justify-center items-center flex-col">
            <div className={clsx(
                `relative text-xl w-12 h-12 flex justify-center items-center mb-2 bg-brownDarkBtn font-bold border-solid border-4 border-blackBorder rounded-[50%] font-roboto`,
                { 'text-white': props.status === "done" },
                { 'bg-brownMainHover text-brownCardBlackBg': props.status === "active" },
                { 'bg-brownDarkBtn text-brownCardBlackBg': props.status === "unfinished" }
            )}>
                {props.stepNum}
            </div>
            <h6 className={clsx(
                `relative text-lg font-poppins`,
                { 'text-white': props.status === "done" },
                { 'text-brownMainHover': props.status === "active" },
                { 'text-brownDarkBtn': props.status === "unfinished" }
            )}>
                {props.label}
            </h6>
        </li>
    );
};