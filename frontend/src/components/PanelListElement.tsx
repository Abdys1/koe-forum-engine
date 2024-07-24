type PanelListElementProps = {
    title: string,
    btnTitle: string
};

export default function PanelListElement(props: PanelListElementProps) {
    return (
        <li className="relative list-none w-[calc(100% - 4rem)] h-9 min-h-9 pl-4 m-2 flex justify-between items-center text-white text-sm font-medium tracking-wider font-poppins bg-gradient-to-t from-cardMediumBg to-cardBlackBg overflow-hidden z-20
                        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-t before:from-transparent before:to-[rgba(0,0,0,0.3)] before:z-20
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-l after:from-transparent after:to-transparent after:hover:to-mainMedium after:opacity-40 after:-z-10">
            {props.title}
            <button className="relative h-full pr-2 flex justify-start items-center bg-secondary hover:bg-secondaryMedium text-cardMediumBg text-sm font-medium tracking-widest cursor-pointer z-10
                        before:content-[''] before:absolute before:top-0 before:-left-[20px] before:h-[150%] before:w-[60px] before:bg-secondary before:hover:bg-secondaryMedium before:rotate-[25deg] before:-z-10">
                {props.btnTitle}
            </button>
        </li>
    );
}