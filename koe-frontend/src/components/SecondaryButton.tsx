'use client'

import { sumana } from "@/app/fonts";

export default function SecondaryButton({ children, onClick }: Readonly<{
    children: React.ReactNode,
    onClick: () => void
  }>) {
    return (
        <button onClick={onClick} className={`relaive w-72 h-14 pb-0.5 flex justify-center items-center text-2xl text-white bg-transparent ${sumana.className} uppercase tracking-widest rounded-md border-2 border-solid border-white hover:bg-[rgba(255,255,255,0.3)]`}>
            { children }
        </button>
    )
}