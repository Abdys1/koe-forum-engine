import InputField from "@/components/inputs/InputField";
import { forwardRef } from "react";

export interface PasswordFieldProps {
    name: string
}


export default forwardRef<HTMLInputElement, PasswordFieldProps>(({ name }, ref) => {
    return (
        <>
            <InputField label="Jelszó" type="password" name={name} ref={ref}/>
        </>
    );
});