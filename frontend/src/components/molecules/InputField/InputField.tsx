'use client'

import clsx from "clsx";
import React, { forwardRef, useId } from "react";

import * as styles from "./InputField.css";

type InputFieldProps = {
    label: string,
    name: string,
    type?: "text" | "password" | "email",
    error?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
};

export default forwardRef<HTMLInputElement, InputFieldProps>(
    function InputField({ label, name, type = "text", error, onChange, onBlur }, ref) {
        const inputId = useId();
        const errorId = useId();

        return (
            <div className={clsx(styles.wrapper, error ? styles.wrapperError : styles.wrapperDefault)}>
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
                <input id={inputId} type={type} name={name} ref={ref}
                    onChange={onChange} onBlur={onBlur}
                    aria-invalid={!!error} aria-describedby={error ? errorId : undefined}
                    className={clsx(styles.input, error ? styles.inputError : styles.inputDefault)}
                />
                {error && <span id={errorId} role="alert" className={styles.errorMsg}>{error}</span>}
            </div>
        );
    }
);
