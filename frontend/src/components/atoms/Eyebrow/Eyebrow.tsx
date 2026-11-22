import clsx from "clsx";
import { ReactNode } from "react";

import { eyebrow } from "@/styles/shared.css";

type EyebrowProps = {
    children: ReactNode,
    className?: string
}

export default function Eyebrow({ children, className }: EyebrowProps) {
    return <span className={clsx(eyebrow, className)}>{children}</span>;
}
