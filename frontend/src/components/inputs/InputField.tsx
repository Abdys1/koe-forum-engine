'use client'

import clsx from "clsx";
import React, { forwardRef, useId } from "react";
import { FieldErrors } from "react-hook-form";

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

        const errorMsg = errors?.[name]?.message as string | undefined;

        return (
            <div className={clsx(
                'relative mt-4 flex flex-col font-poppins',
                errorMsg ? 'text-red-500' : 'text-secondary'
            )}>
                <label htmlFor={inputId} className='relative mb-3 cursor-text tracking-widest font-poppins font-medium text-white'>
                    {label}
                </label>
                <input id={inputId} type={type} name={name} ref={ref}
                    onChange={onChange} onBlur={onBlur}
                    className={clsx(
                        'mb-7 border-2 rounded-md px-2 py-1.5 focus:outline-none bg-cardBlackBg/10 font-poppins tracking-widest',
                        errorMsg ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-secondary'
                    )} />
                
                {errorMsg && <span role="alert" className="absolute left-0 bottom-0 font-roboto">{errorMsg}</span>}
            </div>
        );
    }
);