'use client'

import clsx from "clsx";
import React, { forwardRef, useId, useState } from "react";
import { text } from "stream/consumers";

type InputFieldProps = {
    label: string,
    type: string,
    name: string,
    error?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
};

export default forwardRef<HTMLInputElement, InputFieldProps>(({ label, name, type, error, onChange, onBlur }, ref) => {
    const inputId = useId();

    const [hasValue, setHasValue] = useState(false);

    const color: string = error ? 'red-500' : 'mainLight';

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (onChange) {
            onChange(e);
        }
        setHasValue(!!e.target.value);
    }

    return (
        <div className={`relative text-${color} flex flex-col`}>
            <input id={inputId} type={type} name={name} ref={ref}
                onChange={handleChange} onBlur={onBlur}
                className={`peer pb-1 mb-4 border-b-2 border-${color} focus:outline-none bg-transparent font-poppins font-semibold tracking-widest`}/>
            <label htmlFor={inputId} className={clsx(
                'absolute cursor-text left-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:cursor-default transition-all ease-in-out duration-150',
                { '-translate-y-5 text-sm cursor-default': hasValue }
            )}>{label}</label>
            {error && <span role="alert">{error}</span>}
        </div>
    );
});