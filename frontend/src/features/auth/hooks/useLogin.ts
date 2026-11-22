import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { LoginInputs } from "@/features/auth/model/login";
import { toSameOriginPath } from "@/features/auth/model/redirect";

export interface LoginOptions {
    onSuccess?: () => void,
    callbackUrl?: string
}

export interface Login {
    login: (inputs: LoginInputs) => Promise<void>,
    loginFailed: boolean
}

export function useLogin({ onSuccess, callbackUrl }: LoginOptions): Login {
    const router = useRouter();
    const [loginFailed, setLoginFailed] = useState(false);

    const login = async ({ username, password }: LoginInputs) => {
        const response = await signIn("credentials", { username, password, redirect: false });
        if (!response?.ok) {
            setLoginFailed(true);
            return;
        }
        setLoginFailed(false);
        if (onSuccess) {
            onSuccess();
        } else {
            router.push(toSameOriginPath(callbackUrl, window.location.origin));
            router.refresh();
        }
    };

    return { login, loginFailed };
}
