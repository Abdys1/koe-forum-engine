import { RefObject, useEffect } from "react";

export function useDismissable(ref: RefObject<HTMLElement>, isActive: boolean, onDismiss: () => void): void {
    useEffect(() => {
        if (!isActive) {
            return;
        }
        const dismissOnOutsideClick = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) {
                onDismiss();
            }
        };
        const dismissOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onDismiss();
            }
        };
        document.addEventListener("mousedown", dismissOnOutsideClick);
        document.addEventListener("keydown", dismissOnEscape);
        return () => {
            document.removeEventListener("mousedown", dismissOnOutsideClick);
            document.removeEventListener("keydown", dismissOnEscape);
        };
    }, [ref, isActive, onDismiss]);
}
