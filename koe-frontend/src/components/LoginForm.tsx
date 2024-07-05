import InputField from "@/components/InputField";
import { login } from "@/lib/actions/auth/login";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

type LoginInputs = {
    username: string;
    password: string;
}

export default function LoginForm() {
    const {
        register,
        formState: { errors }, 
        handleSubmit
    } = useForm<LoginInputs>();

    return (
        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-8">
            {errors.username?.type === "required" && <span>Hibás felhasználónév vagy jelszó!</span>}
            <InputField label="Felhasználónév" name="username" type="text" register={register} required/>
            {errors.username?.type === "required" && <span>A felhasználónév megadaása kötelező!</span>}
            <InputField label="Jelszó" name="password" type="password" register={register} required/>
            {errors.password?.type === "required" && <span>A jelszó megadaása kötelező!</span>}
            <button type="submit" className="text-brownMainHover">Bejelentkezem</button>
            <button type="button" className="text-brownMainHover" onClick={async () => await signOut()}>Kijelentkezem</button>
        </form>
    );
}