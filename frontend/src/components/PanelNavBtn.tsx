type PanelNavBtnProps = {
    title: string
}

export default function PanelNavBtn(props: PanelNavBtnProps) {
    return (
        <span className="relative w-1/3 h-full flex justify-center items-center
            bg-cardMediumBg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out z-10
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-3/5 before:hover:bg-gradient-to-t before:hover:from-[#9F96FE] before:hover:to-transparent before:hover:opacity-50 
            after:content-[''] after:absolute after:-bottom-4 after:-right-8 after:h-32 after:w-20 after:bg-slate-400 after:rotate-[20deg] after:opacity-[.035]">
            {props.title}
        </span>
    );
}