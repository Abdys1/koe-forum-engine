import InputField from "@/components/inputs/InputField";
import { forwardRef } from "react";

type TextFieldProps = {
    label: string,
    name: string,
    error?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ label, name, error, onChange, onBlur }, ref) {
    return (
        <>
            <InputField label={label} name={name} ref={ref} onBlur={onBlur} onChange={onChange} error={error} type="text"/>
        </>
    );
});