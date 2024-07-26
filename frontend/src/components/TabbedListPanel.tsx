import PanelNavBtn from "@/components/PanelNavBtn";
import PanelListElement from "@/components/PanelListElement";
import { useState } from "react";

interface ListElement {
    title: string,
    desc: string
}

export interface ListOption {
    name: string,
    elements: ListElement[]
}

interface TabbedListPanelProps {
    options: ListOption[]
}

export default function TabbedListPanel(props: TabbedListPanelProps) {
    const [activeOption, setActiveOption] = useState(0);

    function handleOption(optionIndex: number) :void {
        setActiveOption(optionIndex);
    }

    return (
        <div className="relative w-full max-w-lg h-72 pb-3 flex justify-center items-start flex-col rounded overflow-hidden
                        before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2rem] before:bg-gradient-to-b before:from-transparent before:to-cardBlackBg before:opacity-90 before:z-30
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2rem] after:bg-gradient-to-b after:from-transparent after:to-cardBlackBg after:opacity-40 after:z-30">
            <nav className="absolute top-0 left-0 w-full h-8 flex justify-between items-center bg-cardMediumBg z-20 border-b-[0.5px] border-solid border-[rgba(255,255,255,0.3)]">
                {
                    props.options.map((option, i) => {
                        return(
                            <div style={{'--btnWidth': `${100 / props.options.length}%`} as React.CSSProperties} className="relative w-[var(--btnWidth)] h-full">
                                <PanelNavBtn title={option.name} onClick={() => handleOption(i)} active={activeOption === i}/>
                            </div>
                            
                        );
                    })
                }
            </nav>
            <div className="relative w-full h-full mt-8 py-1 px-4 flex justify-start items-center flex-col bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.05)] overflow-y-auto z-10 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-mainLight">
                <ul className="relative w-full">
                    {
                        props.options[activeOption].elements.map((element) => {
                            return (
                                <PanelListElement title={element.title} desc={element.desc}/>
                            );
                        })
                    }
                </ul> 
            </div>
        </div>
    );
}