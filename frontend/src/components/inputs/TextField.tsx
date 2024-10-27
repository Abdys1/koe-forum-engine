import InputField from "@/components/inputs/InputField";
import { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type TextFieldProps = {
    label: string,
    name: string,
    errors?: FieldErrors<any>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default forwardRef<HTMLInputElement, TextFieldProps>(
    function TextField({ label, name, errors, onChange, onBlur }, ref) {
        return (
            <>
                <InputField label={label} 
                    name={name} 
                    ref={ref} 
                    onBlur={onBlur} 
                    onChange={onChange} 
                    errors={errors} 
                    type="text"/>
            </>
        );
    }
);