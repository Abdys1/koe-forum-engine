'use client'

import clsx from "clsx";
import React, { forwardRef, useId, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { text } from "stream/consumers";

type InputFieldProps = {
    label: string,
    type: string,
    name: string,
    errors?: FieldErrors<any>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
};

export default forwardRef<HTMLInputElement, InputFieldProps>(function InputField({ label, name, type, errors, onChange, onBlur }, ref) {
    const inputId = useId();

    const [hasValue, setHasValue] = useState(false);

    const errorMsg = errors?.[name]?.message as string | undefined;
    const color: string = errorMsg ? 'red-500' : 'mainLight';

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        if (onChange) {
            onChange(e);
        }
        setHasValue(!!e.target.value);
    }

    return (
        <div className={clsx(
                'relative flex flex-col', 
                errorMsg ? 'text-red-600' : 'text-mainLight'
            )}>
            <input id={inputId} type={type} name={name} ref={ref}
                onChange={handleChange} onBlur={onBlur}
                className={clsx(
                    'peer pb-1 mb-4 border-b-2 focus:outline-none bg-transparent font-poppins font-semibold tracking-widest',
                    errorMsg ? 'border-red-600' : 'border-mainLight'
                )}/>
            <label htmlFor={inputId} className={clsx(
                'absolute cursor-text left-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:cursor-default transition-all ease-in-out duration-150',
                { '-translate-y-5 text-sm cursor-default': hasValue }
            )}>{label}</label>
            {errorMsg && <span role="alert">{errorMsg}</span>}
        </div>
    );
});