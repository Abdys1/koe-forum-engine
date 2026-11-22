import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import { accentLink, goldLink, mutedLink } from "@/styles/shared.css";

const variants = {
    accent: accentLink,
    gold: goldLink,
    muted: mutedLink
};

type TextLinkProps = {
    href: string,
    children: ReactNode,
    variant?: keyof typeof variants,
    className?: string,
    title?: string
}

export default function TextLink({ href, children, variant = "gold", className, title }: TextLinkProps) {
    return <Link href={href} className={clsx(variants[variant], className)} title={title}>{children}</Link>;
}
