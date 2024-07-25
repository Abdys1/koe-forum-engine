import clsx from "clsx";

type SelectableOptionBtnProps = {
    title: string,
    active?: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>
};

export default function SelectableOptionBtn(props: SelectableOptionBtnProps) {
    return (
        <button type="button"
            className={clsx(`relative w-28 py-0.5 m-2 border-solid border-2 border-secondary rounded tracking-widest font-poppins font-medium hover:bg-secondary hover:text-cardMediumBg transition duration-300 ease-out`,
                { 'text-cardMediumBg bg-secondary backdrop-blur-none': props.active },
                { 'text-secondary bg-transparent backdrop-blur-md': !props.active }
            )}
            onClick={props.onClick}>
            {props.title}
        </button>
    );
}