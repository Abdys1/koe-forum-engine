import InputField from "@/components/inputs/InputField";
import { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

export interface PasswordFieldProps {
    name: string,
    errors?: FieldErrors<any>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default forwardRef<HTMLInputElement, PasswordFieldProps>(
    function PasswordField({ name, errors, onChange, onBlur }, ref) {
        return (
            <>
                <InputField label="Jelszó" 
                    name={name} 
                    ref={ref} 
                    onChange={onChange} 
                    onBlur={onBlur} 
                    errors={errors} 
                    type="password"/>
            </>
        );
    }
);