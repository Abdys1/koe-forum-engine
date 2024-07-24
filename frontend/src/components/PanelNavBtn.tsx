type PanelNavBtnProps = {
    title: string
}

export default function PanelNavBtn(props: PanelNavBtnProps) {
    return (
        <span className="relative w-1/3 h-full flex justify-center items-center text-white text-sm font-medium tracking-wide uppercase font-poppins bg-cardMediumbg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out z-10
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r after:from-[rgba(255,255,255,0.5)] after:hover:from-mainLight after:to-transparent after:opacity-30 after:hover:opacity-50 after:-z-10">
            {props.title}
        </span>
    );
}