import { caveat, sumana } from "@/app/fonts";
import Image from "next/image";

export default function Title({ subTitle, mainTitle }: { subTitle: string, mainTitle: string }) {
    return (
        <div className="relative w-full h-36 flex justify-center items-center flex-col">
            <Image className="absolute top-3 h-36 w-auto opacity-20" src="/images/logo.png" alt="bölcsek köve szimbólum, a játék logója" width={120} height={120} />
            <h3 className={`relative text-white ${caveat.className} text-2xl tracking-widest`}>{subTitle}</h3>
            <h2 className={`relative text-mainLight ${sumana.className} text-2xl font-bold uppercase tracking-[0.3em]`}>{mainTitle}</h2>
        </div>
    )
}