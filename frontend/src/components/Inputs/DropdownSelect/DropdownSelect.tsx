"use client"

import clsx from "clsx";
import { KeyboardEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import * as styles from "./DropdownSelect.css";

export type DropdownOption<ValueType> = {
    value: ValueType,
    label: ReactNode
}

type DropdownSelectProps<ValueType> = {
    options: DropdownOption<ValueType>[],
    value: ValueType,
    labelId: string,
    onChange: (value: ValueType) => void,
    size?: "medium" | "large",
    className?: string
}

export default function DropdownSelect<ValueType extends string | number>(
    { options, value, labelId, onChange, size = "medium", className }: DropdownSelectProps<ValueType>
) {
    const listboxId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectedIndex = Math.max(options.findIndex(option => option.value === value), 0);
    const [activeIndex, setActiveIndex] = useState(selectedIndex);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        listboxRef.current?.focus();
        const closeOnOutsideClick = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        return () => document.removeEventListener("mousedown", closeOnOutsideClick);
    }, [isOpen]);

    const open = () => {
        setActiveIndex(selectedIndex);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const select = (newValue: ValueType) => {
        close();
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            open();
        }
    };

    const handleListboxKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setActiveIndex(prev => Math.min(prev + 1, options.length - 1));
                break;
            case "ArrowUp":
                event.preventDefault();
                setActiveIndex(prev => Math.max(prev - 1, 0));
                break;
            case "Home":
                event.preventDefault();
                setActiveIndex(0);
                break;
            case "End":
                event.preventDefault();
                setActiveIndex(options.length - 1);
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                select(options[activeIndex].value);
                break;
            case "Escape":
                event.preventDefault();
                event.stopPropagation();
                close();
                break;
            case "Tab":
                setIsOpen(false);
                break;
        }
    };

    return (
        <div ref={containerRef} className={clsx(styles.container, className)}>
            <button
                ref={buttonRef} type="button"
                className={clsx(styles.button, size === "large" && styles.buttonLarge, isOpen && styles.buttonOpen)}
                aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listboxId}
                aria-labelledby={labelId}
                onClick={() => isOpen ? close() : open()} onKeyDown={handleButtonKeyDown}
            >
                <span className={styles.buttonLabel}>{options[selectedIndex]?.label}</span>
                <span className={clsx("material-icons", styles.arrow, size === "large" && styles.arrowLarge,
                    isOpen && styles.arrowOpen)}>expand_more</span>
            </button>
            {isOpen && (
                <ul
                    ref={listboxRef}
                    id={listboxId}
                    role="listbox"
                    tabIndex={-1}
                    className={clsx(styles.listbox, size === "large" && styles.listboxLarge)}
                    aria-labelledby={labelId} aria-activedescendant={`${listboxId}-${activeIndex}`}
                    onKeyDown={handleListboxKeyDown}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            id={`${listboxId}-${index}`}
                            role="option"
                            aria-selected={option.value === value}
                            className={clsx(styles.option, size === "large" && styles.optionLarge, index === activeIndex && styles.optionActive,
                                option.value === value && styles.optionSelected)}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => select(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
