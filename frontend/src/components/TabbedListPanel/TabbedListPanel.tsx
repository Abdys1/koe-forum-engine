import PanelNavBtn from "@/components/PanelNavBtn/PanelNavBtn";
import PanelListElement from "@/components/PanelListElement/PanelListElement";
import { useState } from "react";
import * as styles from "./TabbedListPanel.css";

interface ListElement {
    title: string,
    desc: string
}

export interface ListOption {
    name: string,
    elements: ListElement[],
    onChooseElement: (elementTitle: string) => void
}

interface TabbedListPanelProps {
    options: ListOption[]
}

export default function TabbedListPanel(props: TabbedListPanelProps) {
    const [activeOption, setActiveOption] = useState(0);

    function handleOption(optionIndex: number): void {
        setActiveOption(optionIndex);
    }

    const btnWidth = `${100 / props.options.length}%`;

    return (
        <div className={styles.panel}>
            <nav className={styles.nav}>
                {props.options.map((option, i) => (
                    <div key={option.name}
                         className={styles.navItem}
                         style={{ width: btnWidth, height: '100%' }}>
                        <PanelNavBtn title={option.name} onClick={() => handleOption(i)} active={activeOption === i}/>
                    </div>
                ))}
            </nav>
            <div className={styles.scrollArea}>
                <ul className={styles.list}>
                    {props.options[activeOption].elements.map((element) => (
                        <PanelListElement
                            key={props.options[activeOption].name + element.title}
                            title={element.title}
                            desc={element.desc}
                            onClick={() => props.options[activeOption].onChooseElement(element.title)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
