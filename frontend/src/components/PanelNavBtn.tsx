import clsx from "clsx";

type PanelNavBtnProps = {
    title: string,
    active?: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>
}

export default function PanelNavBtn(props: PanelNavBtnProps) {
    return (
        <span className={clsx(`relative w-full h-full flex justify-center items-center text-white text-sm font-medium tracking-wide uppercase font-poppins bg-cardMediumbg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out z-10
                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:opacity-30 after:-z-10`,
                            {'after:bg-gradient-to-r after:from-[rgba(255,255,255,0.5)] after:hover:from-mainLight after:hover:opacity-70 after:to-transparent': !props.active},
                            {'after:bg-gradient-to-r after:from-mainLight after:to-transparent after:opacity-70': props.active}
                        )}
                        onClick={props.onClick}>
            {props.title}
        </span>
    );
}