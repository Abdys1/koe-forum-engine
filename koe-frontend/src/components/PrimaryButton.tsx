'use client'

import { sumana } from "@/app/fonts";

export default function PrimaryButton({ children, onClick }: Readonly<{
    children: React.ReactNode,
    onClick: () => void
  }>) {
    return (
        <button onClick={onClick} className={`relaive w-72 h-14 pb-0.5 flex justify-center items-center text-2xl text-white bg-mainMedium ${sumana.className} uppercase tracking-[0.3em] rounded-md hover:bg-mainHover hover:text-darkText`}>
            { children }
        </button>
    )
}