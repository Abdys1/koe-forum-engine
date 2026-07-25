'use client'

import clsx from "clsx";
import React, { forwardRef, useId } from "react";
import { FieldErrors } from "react-hook-form";
import * as styles from "./InputField.css";

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
            <div className={clsx(styles.wrapper, errorMsg ? styles.wrapperError : styles.wrapperDefault)}>
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
                <input id={inputId} type={type} name={name} ref={ref}
                    onChange={onChange} onBlur={onBlur}
                    className={clsx(styles.input, errorMsg ? styles.inputError : styles.inputDefault)}
                />
                {errorMsg && <span role="alert" className={styles.errorMsg}>{errorMsg}</span>}
            </div>
        );
    }
);
