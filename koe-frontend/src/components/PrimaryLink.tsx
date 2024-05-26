import { sumana } from "@/app/fonts";
import Link from "next/link";

type PrimaryLinkProps = {
    children: React.ReactNode,
    href: string
}

export default function PrimaryLink({ children, href }: PrimaryLinkProps) {
    return (
        <Link href={ href } className={`w-72 h-14 pb-0.5 flex justify-center items-center text-2xl text-white bg-mainMedium ${sumana.className} uppercase tracking-[0.3em] rounded-md hover:bg-mainHover hover:text-darkText`}>
            { children }
        </Link>
    )
}