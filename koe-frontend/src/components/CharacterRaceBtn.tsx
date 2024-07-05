import clsx from "clsx";

type CharacterRaceBtnProps = {
    title: string,
    active?: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>
};

export default function CharacterRaceBtn({ title, active = false, onClick }: CharacterRaceBtnProps) {
    return (
        <li className={clsx(`relative w-48 h-11 mb-4 flex justify-start items-center bg-cardMediumBg rounded-sm outline outline-1 outline-offset-2  hover:outline-mainLight overflow-hidden cursor-pointer
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-3/5 before:hover:bg-gradient-to-t before:hover:from-[#9F96FE] before:hover:to-transparent before:hover:opacity-50 
            after:content-[''] after:absolute after:-bottom-4 after:-right-8 after:h-32 after:w-20 after:bg-slate-400 after:rotate-[20deg] after:opacity-[.035]`,
            { 'outline-mainLight before:bg-gradient-to-t before:from-[#9F96FE] before:to-transparent before:opacity-50': active },
            { 'outline-cardMediumBg before:bg-gradient-to-t before:from-[#101112] before:to-transparent before:opacity-80 ': !active }
        )}
            onClick={onClick}>
            <span className="relative flex justify-start items-center  h-full w-10 bg-[url('/images/ryldan-nobg.png')] bg-no-repeat bg-left-bottom bg-contain"></span>
            <span className="relative px-4 text-white tracking-widest font-poppins">
                {title}
            </span>
        </li>
    );
};