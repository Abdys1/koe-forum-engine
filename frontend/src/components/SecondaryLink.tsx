import { sumana } from "@/app/fonts";
import Link from "next/link";

type SecondaryLinkProps = {
    children: React.ReactNode,
    href: string
}

export default function SecondaryLink({ children, href }: SecondaryLinkProps) {
    return (
        <Link href={ href } className={`w-72 h-14 pb-0.5 flex justify-center items-center text-2xl text-white bg-transparent ${sumana.className} uppercase tracking-widest rounded-md border-2 border-solid border-white hover:bg-[rgba(255,255,255,0.3)]`}>
            { children }
        </Link>
    )
}