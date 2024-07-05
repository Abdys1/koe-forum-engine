import InputField from "@/components/inputs/InputField";
import { forwardRef } from "react";

type TextFieldProps = {
    label: string,
    name: string
}

export default forwardRef<HTMLInputElement, TextFieldProps>(({ label, name }, ref) => {
    return (
        <>
            <InputField label={label} name={name} ref={ref} type="text"/>
        </>
    );
});