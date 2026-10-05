"use client"

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as styles from "./BackgroundSlideshow.css";

type Slide = {
    src: string,
    alt: string
}

type BackgroundSlideshowProps = {
    slides: Slide[],
    interval?: number
}

export default function BackgroundSlideshow({ slides, interval = 7000 }: BackgroundSlideshowProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        const timer = window.setTimeout(() => setActiveIndex(index => (index + 1) % slides.length), interval);
        return () => window.clearTimeout(timer);
    }, [activeIndex, slides.length, interval]);

    return (
        <div className={styles.slideshow}>
            {slides.map((slide, index) => (
                <div key={slide.src} className={clsx(styles.slide, index === activeIndex && styles.slideActive)}
                    aria-hidden={index !== activeIndex}>
                    <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw"
                        className={styles.image} />
                </div>
            ))}
            <div className={styles.veil} />
            {slides.length > 1 && (
                <div className={styles.dots}>
                    {slides.map((slide, index) => (
                        <button key={slide.src} type="button"
                            className={clsx(styles.dot, index === activeIndex && styles.dotActive)}
                            aria-label={`${index + 1}. háttérkép`}
                            aria-current={index === activeIndex}
                            onClick={() => setActiveIndex(index)} />
                    ))}
                </div>
            )}
        </div>
    );
}
