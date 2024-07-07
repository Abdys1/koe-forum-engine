import InputField from "@/components/inputs/InputField";
import { forwardRef } from "react";

export interface PasswordFieldProps {
    name: string,
    error?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}


export default forwardRef<HTMLInputElement, PasswordFieldProps>(({ name, error, onChange, onBlur }, ref) => {
    return (
        <>
            <InputField label="Jelszó" name={name} ref={ref} onChange={onChange} onBlur={onBlur} error={error} type="password"/>
        </>
    );
});