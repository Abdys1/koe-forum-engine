"use client"

import clsx from "clsx";
import Image from "next/image";
import { useId, useState } from "react";
import { glassFrame } from "@/styles/shared.css";
import * as styles from "./Showcase.css";

type ShowcaseElement = {
    id: string,
    name: string,
    imageUrl: string,
    imageAlt: string,
    description: string
}

type ShowcaseProps = {
    showcaseElements: ShowcaseElement[],
    label: string
}

export default function Showcase({ showcaseElements, label }: ShowcaseProps) {
    const idPrefix = useId();
    const [activeId, setActiveId] = useState(showcaseElements[0].id);

    const activeElement = showcaseElements.find(element => element.id === activeId) ?? showcaseElements[0];

    return (
        <div className={styles.showcase}>
            <div className={styles.tabs} role="tablist" aria-label={label}>
                {showcaseElements.map(element => (
                    <button key={element.id} type="button" role="tab"
                        id={`${idPrefix}-tab-${element.id}`}
                        aria-selected={element.id === activeId}
                        aria-controls={`${idPrefix}-panel`}
                        className={clsx(styles.tab, element.id === activeId && styles.tabActive)}
                        onClick={() => setActiveId(element.id)}>
                        {element.name}
                    </button>
                ))}
            </div>
            <div id={`${idPrefix}-panel`} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${activeElement.id}`}>
                <div className={glassFrame}>
                    <div className={styles.imageWrap}>
                        {showcaseElements.map(element => (
                            <Image key={element.id} src={element.imageUrl} alt={element.imageAlt} fill
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                aria-hidden={element.id !== activeId}
                                className={clsx(styles.image, element.id === activeId && styles.imageActive)} />
                        ))}
                    </div>
                </div>
                <h3 className={styles.title}>{activeElement.name}</h3>
                <p className={styles.description}>{activeElement.description}</p>
            </div>
        </div>
    );
}
