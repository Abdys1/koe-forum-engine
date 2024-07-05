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
                `relative text-lg w-10 h-10 flex justify-center items-center mb-1 bg-darkBtn font-bold border-solid border-4 border-blackBorder rounded-[50%] font-roboto`,
                { 'text-white bg-mainMedium': props.status === "done" },
                { 'bg-mainHover text-cardBlackBg': props.status === "active" },
                { 'bg-cardMediumBg text-white': props.status === "unfinished" }
            )}>
                {props.stepNum}
            </div>
            <h6 className={clsx(
                `relative text-sm font-poppins tracking-widest`,
                { 'text-white': props.status === "done" },
                { 'text-mainHover': props.status === "active" },
                { 'text-white': props.status === "unfinished" }
            )}>
                {props.label}
            </h6>
        </li>
    );

};