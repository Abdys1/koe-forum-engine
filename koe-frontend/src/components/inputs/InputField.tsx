'use client'

import clsx from "clsx";
import { forwardRef, useId, useState } from "react";

type InputFieldProps = {
    label: string,
    type: string,
    name: string
};

export default forwardRef<HTMLInputElement, InputFieldProps>(({ label, name, type }, ref) => {
    const inputId = useId();

    const [hasValue, setHasValue] = useState(false);

    return (
        <div className='relative'>
            <input id={inputId} type={type} name={name} ref={ref}
                onChange={e => setHasValue(!!e.target.value)}
                className="peer pb-1 mb-4 border-b-2 border-mainLight focus:outline-none bg-transparent text-mainLight font-poppins font-semibold tracking-widest"/>
            <label htmlFor={ inputId } className={clsx(
                'absolute text-mainLight cursor-text left-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:cursor-default transition-all ease-in-out duration-150',
                { '-translate-y-5 text-sm cursor-default': hasValue }
            )}>{label}</label>
        </div>
    );
});