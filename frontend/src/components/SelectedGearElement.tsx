type SelectedGearElementProps = {
    optionTitle: string,
    gearTitle: string,
    onClear: React.MouseEventHandler<HTMLElement>
}

export default function SelectedGearElement(props: SelectedGearElementProps) {

    return (
        <div className="relative w-full mb-2 flex justify-start items-center flex-col">
            <h4 className="relative w-full text-mainHover font-poppins font-medium tracking-wider text-sm uppercase">
                {props.optionTitle}
            </h4>
            <div className="reltive w-full flex justify-start items-center">
                <span className="relative text-sm font-poppins text-white tracking-widest">
                    {props.gearTitle}
                </span>
                <button onClick={props.onClear} type="button" className="relative w-4 h-4 ml-2 p-0 flex justify-center items-center bg-secondary rounded-[50%] font-poppins text-xs font-medium
                            hover:bg-secondaryMedium">
                    x
                </button>
            </div> 
        </div>
    );
}