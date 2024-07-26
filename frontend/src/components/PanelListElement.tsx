import clsx from "clsx";
import { useState } from "react";

type PanelListElementProps = {
    title: string,
    desc: string
};

export default function PanelListElement(props: PanelListElementProps) {
    const [isActiveDesc, setIsActiveDesc] = useState(false);

    function descToggle() {
        setIsActiveDesc(!isActiveDesc);
    }

    return (
        <li className="relative w-[calc(100% - 4rem)]">
            <div className={clsx(`relative list-none w-[calc(100% - 4rem)] h-9 min-h-9 pl-4 my-3 flex justify-between items-center text-white text-sm font-medium tracking-wider font-poppins bg-gradient-to-t from-cardMediumBg to-cardBlackBg rounded-sm overflow-hidden z-20
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-t before:from-transparent before:to-[rgba(0,0,0,0.3)] before:z-20
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:opacity-40 after:-z-10`,
                {'after:bg-gradient-to-l after:from-transparent after:to-mainMedium': isActiveDesc},
                {'after:bg-gradient-to-l after:from-transparent after:to-transparent after:hover:to-mainMedium': !isActiveDesc}
            )}
            onClick={descToggle}
            >
                 {props.title}
                <button className="relative h-full pr-2 flex justify-start items-center bg-secondary hover:bg-secondaryMedium text-cardMediumBg text-sm font-medium tracking-widest cursor-pointer z-10
                            before:content-[''] before:absolute before:top-0 before:-left-[20px] before:h-[150%] before:w-[60px] before:bg-secondary before:hover:bg-secondaryMedium before:rotate-[25deg] before:-z-10">
                    Kiválaszt
                </button>
            </div>
            
            <div className={clsx(`relative w-full p-2 mb-2 text-white text-sm font-light tracking-wider font-poppins bg-cardBlackBg rounded-sm overflow-hidden opacity-90 z-20
                            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-t before:from-transparent before:to-[rgba(0,0,0,0.3)] before:z-20`,
                            {'flex': isActiveDesc},
                            {'hidden': !isActiveDesc}
                        )}>
                    {props.desc}
            </div>
        </li>
    );
}