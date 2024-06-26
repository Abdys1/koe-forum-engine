'use client'

import clsx from "clsx";
import { useId, useState } from "react";

type InputFieldProps = {
    label: string,
    name: string,
    type: string,
    onChange?: (e: string) => void 
};

export default function InputField({ label, name, type, onChange }: InputFieldProps) {
    const inputId = useId();

    const [hasValue, setHasValue] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newVal = e.target.value;
        setHasValue(!!newVal);
        if (onChange) {
            onChange(newVal);
        }
    }

    return (
        <div className='relative'>
            <input id={ inputId } name={ name } type={ type }
                onChange={handleChange}
                className="peer pb-1 border-b-2 focus:outline-none"/>
            <label htmlFor={ inputId } className={clsx(
                'absolute cursor-text left-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:cursor-default transition-all ease-in-out duration-150',
                { '-translate-y-5 text-sm cursor-default': hasValue }
            )}>{ label }</label>    
        </div>
    );
}