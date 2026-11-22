'use client'

import LoginFormPanel from "@/components/organisms/auth/LoginForm/LoginFormPanel";
import { LoginOptions, useLogin } from "@/features/auth/hooks/useLogin";

export default function LoginForm(options: LoginOptions) {
    const { login, loginFailed } = useLogin(options);

    return <LoginFormPanel loginFailed={loginFailed} onSubmit={login}/>;
}
