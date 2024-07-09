import clsx from "clsx";

type MultiStepNavBtnProps = {
    title: string,
    type: "button" | "submit",
    status: "active" | "disabled" | "hidden"
};

export default function MultiStepNavBtn(props: MultiStepNavBtnProps) {
    return (
        <button className={clsx(`relative w-36 py-0.5 mx-2 my-0 border-solid border-2  rounded tracking-wider font-poppins font-medium transition-all duration-500 ease-in-out`,
            { "hidden": props.status === "hidden" },
            { "inline-block border-white bg-[rgba(0,0,0,0.3)] text-white cursor-default": props.status === "disabled" },
            { "inline-block border-white bg-white text-darkText hover:text-mainMedium hover:tracking-widest": props.status === "active" }
        )}
            type={props.type}>
            {props.title}
        </button>
    );
};