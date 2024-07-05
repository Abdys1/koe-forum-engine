'use client'

import clsx from "clsx";
import { useId, useState } from "react";
import { UseFormRegister } from "react-hook-form";

type InputFieldProps = {
    label: string,
    type: string,
    name: string,
    required?: boolean,
    register: UseFormRegister<any>
};

export default function InputField({ label, name, type, register, required }: InputFieldProps) {
    const inputId = useId();

    const [hasValue, setHasValue] = useState(false);

    return (
        <div className='relative'>
            <input {...register(name, { required })} id={ inputId } type={ type }
                onChange={e => setHasValue(!!e.target.value)}
                className="peer pb-1 mb-4 border-b-2 border-mainLight focus:outline-none bg-transparent text-mainLight font-poppins font-semibold tracking-widest"/>
            <label htmlFor={ inputId } className={clsx(
                'absolute text-brownMainHover cursor-text left-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:cursor-default transition-all ease-in-out duration-150',
                { '-translate-y-5 text-sm cursor-default': hasValue }
            )}>{label}</label>
        </div>
    );
}