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

export default forwardRef<HTMLInputElement, InputFieldProps>(
    function InputField({ label, name, type, errors, onChange, onBlur }, ref) {
        const inputId = useId();

        const [hasValue, setHasValue] = useState(false);

        const errorMsg = errors?.[name]?.message as string | undefined;

        function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
            if (onChange) {
                onChange(e);
            }
            setHasValue(!!e.target.value);
        }

        return (
            <div className={clsx(
                'relative mt-4 flex flex-col font-poppins',
                errorMsg ? 'text-red-500' : 'text-secondary'
            )}>
                <input id={inputId} type={type} name={name} ref={ref}
                    onChange={handleChange} onBlur={onBlur}
                    className={clsx(
                        'peer pb-1 mb-4 border-b-2 focus:outline-none bg-transparent font-poppins font-semibold tracking-widest',
                        errorMsg ? 'border-red-500' : 'border-secondary'
                    )} />
                <label htmlFor={inputId} className={clsx(
                    'absolute cursor-text left-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:cursor-default transition-all ease-in-out duration-150 tracking-widest font-poppins font-medium',
                    { '-translate-y-5 text-sm cursor-default': hasValue }
                )}>{label}</label>
                {errorMsg && <span role="alert" className="font-roboto">{errorMsg}</span>}
            </div>
        );
    }
);